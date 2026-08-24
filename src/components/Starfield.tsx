import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  embedded?: boolean;
  className?: string;
}

export default function Starfield({ embedded = false, className = '' }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const opacity = 0.7;

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionAllowed = !motionQuery.matches;
    const measuredWidth = () => embedded ? canvas.clientWidth || window.innerWidth : window.innerWidth;
    const measuredHeight = () => embedded ? canvas.clientHeight || window.innerHeight : window.innerHeight;
    let width = canvas.width = measuredWidth();
    let height = canvas.height = measuredHeight();

    interface Star {
      x: number;
      y: number;
      radius: number;
      twinkleSpeed: number;
      alpha: number;
      direction: number;
      speedX: number;
      speedY: number;
    }

    const stars: Star[] = [];
    const isNarrowScreen = width < 768;
    const starCount = embedded
      ? (isNarrowScreen ? 96 : 145)
      : (isNarrowScreen ? 110 : 175);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.55 + 0.4,
        twinkleSpeed: 0.003 + Math.random() * 0.008,
        alpha: Math.random() * 0.8 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04,
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = event.clientX;
      mouseRef.current.targetY = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches[0]) {
        mouseRef.current.targetX = event.touches[0].clientX;
        mouseRef.current.targetY = event.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = measuredWidth();
      height = canvas.height = measuredHeight();
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const currentScroll = embedded ? 0 : window.scrollY;

      const projectedStars = stars.map((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const parallaxFactor = star.radius * 0.18;
        const shiftedY = (star.y - currentScroll * parallaxFactor) % height;
        const constrainedY = shiftedY < 0 ? shiftedY + height : shiftedY;

        let drawX = star.x;
        let drawY = constrainedY;
        let brightnessMultiplier = 1;

        const dx = drawX - mouse.x;
        const dy = drawY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxHoverDistance = 130;

        if (distance < maxHoverDistance) {
          const force = (maxHoverDistance - distance) / maxHoverDistance;
          brightnessMultiplier = 1 + force * 0.8;
          const angle = Math.atan2(dy, dx);
          const pushDistance = force * 18;
          drawX += Math.cos(angle) * pushDistance;
          drawY += Math.sin(angle) * pushDistance;
        }

        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.direction = -1;
        } else if (star.alpha <= 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        return {
          drawX,
          drawY,
          alpha: star.alpha * brightnessMultiplier,
          radius: star.radius,
        };
      });

      const isLight = document.body.classList.contains('light-mode');

      if (mouse.x > -500) {
        ctx.strokeStyle = isLight ? 'rgba(64, 43, 33, 0.62)' : 'rgba(203, 173, 142, 0.16)';
        ctx.lineWidth = isLight ? 1 : 0.7;
        for (let i = 0; i < projectedStars.length; i++) {
          const firstStar = projectedStars[i];
          const mouseDistance = Math.sqrt((firstStar.drawX - mouse.x) ** 2 + (firstStar.drawY - mouse.y) ** 2);
          if (mouseDistance > 160) continue;

          for (let j = i + 1; j < projectedStars.length; j++) {
            const secondStar = projectedStars[j];
            const dx = firstStar.drawX - secondStar.drawX;
            const dy = firstStar.drawY - secondStar.drawY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 75) {
              ctx.beginPath();
              ctx.moveTo(firstStar.drawX, firstStar.drawY);
              ctx.lineTo(secondStar.drawX, secondStar.drawY);
              ctx.stroke();
            }
          }
        }
      }

      projectedStars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.drawX, star.drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(49, 32, 25, ${Math.min(1, star.alpha)})`
          : `rgba(255, 248, 238, ${Math.min(0.98, star.alpha * (embedded ? 0.98 : 0.8))})`;

        if (star.radius > 1.1) {
          ctx.shadowBlur = star.radius * 3.5;
          ctx.shadowColor = isLight ? 'rgba(113, 73, 52, 0.62)' : 'rgba(203, 173, 142, 0.58)';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = 0;
      if (motionAllowed) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      motionAllowed = !event.matches;
      if (!motionAllowed && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
        render();
      } else if (motionAllowed && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    motionQuery.addEventListener('change', handleMotionPreference);

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionPreference);
    };
  }, [embedded]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity }}
      className={`starfield-canvas pointer-events-none inset-0 h-full w-full transition-opacity duration-500 ease-out ${embedded ? 'absolute' : 'fixed z-0'} ${className}`}
    />
  );
}
