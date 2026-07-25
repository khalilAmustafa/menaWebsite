import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const opacity = 0.7;

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

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
    const starCount = 140; // Slightly increased density to enrich interactive connection clusters

    // Populate stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        twinkleSpeed: 0.003 + Math.random() * 0.008,
        alpha: Math.random() * 0.8 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
        speedX: (Math.random() - 0.5) * 0.04, // Delicate drifting speeds
        speedY: (Math.random() - 0.5) * 0.04,
      });
    }

    // Handle mouse movement and touch gestures
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Handle viewport resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampened mouse cursor follow
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const currentScroll = window.scrollY;

      // Project actual draw positions after scroll parallax drift
      const projectedStars = stars.map((star) => {
        // Star basic drifting movement
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Scroll Parallax calculations - larger stars appear closer and move slightly faster
        const parallaxFactor = star.radius * 0.18;
        const shiftedY = (star.y - currentScroll * parallaxFactor) % height;
        const constrainedY = shiftedY < 0 ? shiftedY + height : shiftedY;

        // Interactive mouse hover feedback (repulsion/magnetic drift)
        let drawX = star.x;
        let drawY = constrainedY;
        let brightnessMultiplier = 1.0;

        const dx = drawX - mouse.x;
        const dy = drawY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxHoverDistance = 130;

        if (distance < maxHoverDistance) {
          const force = (maxHoverDistance - distance) / maxHoverDistance;
          brightnessMultiplier = 1.0 + force * 0.8; // Star glows brighter when hovered
          
          // Subtle magnetic escape angle away from the mouse
          const angle = Math.atan2(dy, dx);
          const pushDist = force * 18;
          drawX += Math.cos(angle) * pushDist;
          drawY += Math.sin(angle) * pushDist;
        }

        // Handle Twinkling
        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.direction = -1;
        } else if (star.alpha <= 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        return {
          original: star,
          drawX,
          drawY,
          alpha: star.alpha * brightnessMultiplier,
          radius: star.radius
        };
      });

      // Draw constellation paths/webbing between nearby stars if hovering nearby
      const isLight = document.body.classList.contains('light-mode');

      if (mouse.x > -500) {
        ctx.strokeStyle = isLight ? 'rgba(203, 173, 142, 0.15)' : 'rgba(203, 173, 142, 0.08)';
        ctx.lineWidth = 0.6;
        for (let i = 0; i < projectedStars.length; i++) {
          const p1 = projectedStars[i];
          
          // Only check points somewhat close to mouse or each other to keep performance high
          const mDist = Math.sqrt((p1.drawX - mouse.x) ** 2 + (p1.drawY - mouse.y) ** 2);
          if (mDist > 160) continue;

          for (let j = i + 1; j < projectedStars.length; j++) {
            const p2 = projectedStars[j];
            const dx = p1.drawX - p2.drawX;
            const dy = p1.drawY - p2.drawY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 75) {
              // Draw delicate space bridge
              ctx.beginPath();
              ctx.moveTo(p1.drawX, p1.drawY);
              ctx.lineTo(p2.drawX, p2.drawY);
              ctx.stroke();
            }
          }
        }
      }

      // Render individual stars
      projectedStars.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.drawX, p.drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight 
          ? `rgba(58, 44, 38, ${Math.min(0.75, p.alpha * 0.55)})`
          : `rgba(255, 255, 255, ${Math.min(0.95, p.alpha * 0.65)})`;
        
        // Brand teal cosmic atmosphere glow for active larger stars
        if (p.radius > 1.1) {
          ctx.shadowBlur = p.radius * 3.5;
          ctx.shadowColor = isLight ? 'rgba(203, 173, 142, 0.25)' : 'rgba(203, 173, 142, 0.45)';
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full transition-opacity duration-500 ease-out"
    />
  );
}
