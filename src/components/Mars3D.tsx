import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Orbit, Compass, Cpu, ZoomIn } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function Mars3D({ isArabic }: { isArabic: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive rotation state
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const [zoomFactor, setZoomFactor] = useState<number>(1);
  const [activeOrbitCount, setActiveOrbitCount] = useState<number>(3);

  // Generate scientific features on Mars' surface
  // Olympus Mons, Valles Marineris, polar caps, canyons, dunes, impact basins
  const featuresRef = useRef<Point3D[]>([]);
  if (featuresRef.current.length === 0) {
    const points: Point3D[] = [];
    
    // Polar Cap (North Pole) - dense white-blue particles
    for (let i = 0; i < 40; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * 0.15; // very close to top
      const r = 0.98;
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: -r * Math.cos(phi), // Top is negative Y in canvas coordinates
        z: r * Math.sin(phi) * Math.sin(theta),
        size: Math.random() * 2.5 + 1.5,
        color: '#E5F3FD' // icy blue-white
      });
    }

    // Polar Cap (South Pole) - smaller ice deposit
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * 0.12; 
      const r = 0.98;
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi), 
        z: r * Math.sin(phi) * Math.sin(theta),
        size: Math.random() * 2 + 1,
        color: '#E0F0FC'
      });
    }

    // Olympus Mons (giant shield volcano) - reddish brown ring with a bright shield
    const volcanoLat = 0.3; // 18 degrees North approx
    const volcanoLon = -1.2; 
    points.push({
      x: 0.98 * Math.cos(volcanoLat) * Math.cos(volcanoLon),
      y: 0.98 * Math.sin(volcanoLat),
      z: 0.98 * Math.cos(volcanoLat) * Math.sin(volcanoLon),
      size: 14,
      color: '#4A1D15' // deep caldera shadow
    });
    // caldera caldera light ring
    for (let i = 0; i < 8; i++) {
      const lAngle = (i / 8) * Math.PI * 2;
      const oR = 0.04;
      points.push({
        x: 0.98 * Math.cos(volcanoLat + oR * Math.sin(lAngle)) * Math.cos(volcanoLon + oR * Math.cos(lAngle)),
        y: 0.98 * Math.sin(volcanoLat + oR * Math.sin(lAngle)),
        z: 0.98 * Math.cos(volcanoLat + oR * Math.sin(lAngle)) * Math.sin(volcanoLon + oR * Math.cos(lAngle)),
        size: 3,
        color: '#C1442E'
      });
    }

    // Valles Marineris (giant canyon system) - long horizontal dark rift
    const canyonLength = 30;
    for (let i = 0; i < canyonLength; i++) {
      const t = i / canyonLength;
      const lat = -0.1 + Math.sin(t * Math.PI) * 0.05; // slightly south of equator
      const lon = -0.8 + t * 0.7; // spanning across longitude
      points.push({
        x: 0.98 * Math.cos(lat) * Math.cos(lon),
        y: 0.98 * Math.sin(lat),
        z: 0.98 * Math.cos(lat) * Math.sin(lon),
        size: Math.random() * 4 + 3,
        color: '#260D0A' // dark rust brown fissure
      });
    }

    // General terrain, craggy highlands, iron oxide plains
    for (let i = 0; i < 280; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.98;
      
      // Select colors reflecting Martian iron oxide dust of varying shades
      let color = '#C1442E'; // secondary brand red
      const rand = Math.random();
      if (rand < 0.25) color = '#7A2C1F'; // dark red-brown basin
      else if (rand < 0.5) color = '#E67E65'; // light orange sand plains
      else if (rand < 0.7) color = '#A83B27'; // medium clay rust
      else if (rand < 0.8) color = '#1E1B1B'; // volcanic basalt/iron deposits

      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
        size: Math.random() * 3 + 1,
        color
      });
    }

    featuresRef.current = points;
  }

  // Animation and render loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localRotationY = rotation.y;
    let localRotationX = rotation.x;

    const render = () => {
      // Auto rotate slowly if NOT dragging
      if (!isDragging) {
        localRotationY += 0.003; // speed of orbit rotation
      } else {
        localRotationY = rotation.y;
        localRotationX = rotation.x;
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) * 0.75 * zoomFactor;

      // Clear with elegant transparent backdrop
      ctx.clearRect(0, 0, width, height);

      // 1. Draw outermost orbital radar ring
      ctx.strokeStyle = 'rgba(203, 173, 142, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.stroke();

      // Telemetry markers on the outer telemetry frame
      const elapsed = Date.now() * 0.001;
      ctx.strokeStyle = 'rgba(193, 68, 46, 0.25)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, elapsed * 0.2, elapsed * 0.2 + 0.8);
      ctx.stroke();

      // Interactive Satellite node spinning in its own 3D orbit
      const satAngle = elapsed * 0.6;
      const satX = centerX + Math.cos(satAngle) * radius * 1.25;
      const satY = centerY + Math.sin(satAngle) * radius * 1.25 * 0.45; // compressed for 3D tilt look
      
      // Draw satellite path
      ctx.strokeStyle = 'rgba(203, 173, 142, 0.05)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.25, radius * 0.5, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      // Satellite blinking blink signal node
      ctx.fillStyle = '#cbad8e';
      ctx.beginPath();
      ctx.arc(satX, satY, 4, 0, Math.PI * 2);
      ctx.fill();

      // satellite signal ping aura ring
      ctx.strokeStyle = `rgba(203, 173, 142, ${Math.abs(Math.sin(elapsed * 4)) * 0.4})`;
      ctx.beginPath();
      ctx.arc(satX, satY, 10 + Math.sin(elapsed * 5) * 4, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Beautiful background glow representing atmosphere / corona
      const atmosphereGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.15);
      atmosphereGlow.addColorStop(0, 'rgba(193, 68, 46, 0.25)'); // deep rust orange corona
      atmosphereGlow.addColorStop(0.35, 'rgba(203, 173, 142, 0.12)'); // beautiful sci-fi teal atmospheric transition
      atmosphereGlow.addColorStop(0.85, 'rgba(203, 173, 142, 0.01)');
      atmosphereGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = atmosphereGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw solid base sphere underneath (shaded black to brand red to simulate depth light)
      // Light source comes from top-right-front (simulated directional sun vector)
      const sunGradient = ctx.createRadialGradient(
        centerX + radius * 0.35, 
        centerY - radius * 0.35, 
        radius * 0.1, 
        centerX, 
        centerY, 
        radius
      );
      sunGradient.addColorStop(0, '#C1442E'); // Highlight base red
      sunGradient.addColorStop(0.15, '#993524'); // transitions to deep crimson oxide
      sunGradient.addColorStop(0.55, '#3B130F'); // shadowed dark clay
      sunGradient.addColorStop(1, '#080101'); // Backside shadow
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw planet outline border limit
      ctx.strokeStyle = 'rgba(209, 199, 188, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Mathematical grid lines (Latitude / Longitude vector wiremesh)
      ctx.lineWidth = 0.55;
      
      // Calculate rotation matrix parameters
      const cosY = Math.cos(localRotationY);
      const sinY = Math.sin(localRotationY);
      const cosX = Math.cos(localRotationX);
      const sinX = Math.sin(localRotationX);

      // Helper function to project a 3D coordinate (relative to center of sphere) to 2D canvas
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Rotate around Y-axis
        let x1 = x3d * cosY - z3d * sinY;
        let z1 = x3d * sinY + z3d * cosY;

        // Rotate around X-axis
        let y2 = y3d * cosX - z1 * sinX;
        let z2 = y3d * sinX + z1 * cosX;

        return {
          x: centerX + x1 * radius,
          y: centerY + y2 * radius,
          z: z2, // positive is frontside, negative is backside
        };
      };

      // Draw Longitude Meridian circles
      const meridians = 12;
      for (let m = 0; m < meridians; m++) {
        const lonAngle = (m / meridians) * Math.PI * 2;
        ctx.beginPath();
        let first = true;
        
        // draw longitude circle path
        for (let latStep = 0; latStep <= 40; latStep++) {
          const latAngle = -Math.PI / 2 + (latStep / 40) * Math.PI;
          const px = Math.cos(latAngle) * Math.cos(lonAngle);
          const py = Math.sin(latAngle);
          const pz = Math.cos(latAngle) * Math.sin(lonAngle);

          const pt = project(px, py, pz);
          
          if (pt.z >= 0) { // strictly front hemisphere wire lines
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true; // reset line segment to skip backside coordinates
          }
        }
        ctx.strokeStyle = 'rgba(209, 199, 188, 0.045)';
        ctx.stroke();
      }

      // Draw Latitude parallels
      const parallels = 8;
      for (let p = 1; p < parallels; p++) {
        const latAngle = -Math.PI / 2 + (p / parallels) * Math.PI;
        ctx.beginPath();
        let first = true;

        for (let lonStep = 0; lonStep <= 60; lonStep++) {
          const lonAngle = (lonStep / 60) * Math.PI * 2;
          const px = Math.cos(latAngle) * Math.cos(lonAngle);
          const py = Math.sin(latAngle);
          const pz = Math.cos(latAngle) * Math.sin(lonAngle);

          const pt = project(px, py, pz);

          if (pt.z >= 0) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(209, 199, 188, 0.045)';
        ctx.stroke();
      }

      // 5. Draw 3D Procedural Features Map (Canyon, volcanoes, crust deposits)
      featuresRef.current.forEach(f => {
        const pt = project(f.x, f.y, f.z);

        // Only draw if on frontside of the orthographic sphere (z >= 0)
        if (pt.z >= -0.05) {
          // Calculate lighting factor based on orientation to the sun highlight (at x=0.4, y=-0.4, z=0.8)
          // Simple dot product shading
          const lightIntensity = Math.max(0.12, (pt.z + 0.35) * (f.color === '#E5F3FD' ? 1 : 0.85));
          
          ctx.beginPath();
          // Scale size according to 3D spherical depth mapping
          const depthSize = Math.max(0.6, f.size * (pt.z + 1) * 0.75);
          ctx.arc(pt.x, pt.y, depthSize, 0, Math.PI * 2);
          
          // Apply realistic lighting contrast to detail nodes
          ctx.fillStyle = f.color;
          ctx.globalAlpha = lightIntensity * 0.95;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // 6. Scientific Scanner Hud markings (targets major landing zones / Wadi Rum simulator coords)
      // A scanning green target overlay box centered on arbitrary site
      const targetSiteLat = -0.15; // Wadi Rum coordinate equivalent
      const targetSiteLon = 0.45;
      const targetPt = project(
        0.98 * Math.cos(targetSiteLat) * Math.cos(targetSiteLon),
        0.98 * Math.sin(targetSiteLat),
        0.98 * Math.cos(targetSiteLat) * Math.sin(targetSiteLon)
      );

      if (targetPt.z > 0.1) {
        // Red beacon light
        ctx.fillStyle = '#cbad8e';
        ctx.beginPath();
        ctx.arc(targetPt.x, targetPt.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Radiating pulse ring
        const targetPulse = (Date.now() % 1500) / 1500;
        ctx.strokeStyle = `rgba(203, 173, 142, ${1 - targetPulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(targetPt.x, targetPt.y, 4 + targetPulse * 24, 0, Math.PI * 2);
        ctx.stroke();

        // Scientific box labels
        ctx.strokeStyle = 'rgba(203, 173, 142, 0.45)';
        ctx.lineWidth = 0.75;
        ctx.strokeRect(targetPt.x - 8, targetPt.y - 8, 16, 16);

        // Grid coordinate microtext
        ctx.fillStyle = '#cbad8e';
        ctx.font = '7px monospace';
        ctx.fillText("WADI RUM SITE", targetPt.x + 12, targetPt.y - 3);
        ctx.fillText("ANALOG ZONE", targetPt.x + 12, targetPt.y + 5);
      }

      // Olympus Mons label locator
      const monsPt = project(
        0.98 * Math.cos(0.3) * Math.cos(-1.2),
        0.98 * Math.sin(0.3),
        0.98 * Math.cos(0.3) * Math.sin(-1.2)
      );
      if (monsPt.z > 0.1) {
        ctx.strokeStyle = 'rgba(193, 68, 46, 0.4)';
        ctx.beginPath();
        ctx.moveTo(monsPt.x, monsPt.y);
        ctx.lineTo(monsPt.x - 30, monsPt.y - 25);
        ctx.lineTo(monsPt.x - 70, monsPt.y - 25);
        ctx.stroke();

        ctx.fillStyle = '#C1442E';
        ctx.font = '6px monospace';
        ctx.fillText("OLYMPUS MONS", monsPt.x - 68, monsPt.y - 29);
        ctx.fillText("ALT // 21.9 KM", monsPt.x - 68, monsPt.y - 19);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [rotation, isDragging, zoomFactor]);

  // Touch & Mouse Drag actions
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { x: rotation.x, y: rotation.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    // Sensitivity modifier
    setRotation({
      x: rotationStart.current.x + deltaY * 0.007,
      y: rotationStart.current.y + deltaX * 0.007
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 w-full max-w-md mx-auto aspect-square">
      
      {/* Absolute canvas container */}
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="w-full h-full max-w-[420px] max-h-[420px] cursor-grab active:cursor-grabbing relative z-10 transition-transform duration-300"
      />

      {/* Floating Global Display Status Overlay */}
      <div className="absolute top-2 left-2 z-20 bg-neutral-950/85 border border-neutral-900/60 p-2.5 rounded backdrop-blur-sm pointer-events-auto flex items-center gap-2">
        <Orbit className="w-4 h-4 text-brand-teal animate-spin" style={{ animationDuration: '6s' }} />
        <div className="text-left font-mono text-[8px] leading-none space-y-1">
          <div className="text-neutral-300 uppercase tracking-wider">{isArabic ? "زاوية الدوران" : "VIEWING ANGLE"}</div>
          <div className="text-brand-teal font-bold">{Math.floor(((rotation.y * 57.295) % 360 + 360) % 360)}° ROTATION</div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 z-20 bg-neutral-950/85 border border-neutral-900/60 p-2.5 rounded backdrop-blur-sm pointer-events-auto flex gap-1.5">
        <button 
          onClick={() => setZoomFactor(prev => Math.min(1.3, prev + 0.1))}
          className="p-1 hover:bg-neutral-900 border border-neutral-800 text-brand-beige rounded text-[9px] font-bold font-mono transition-colors cursor-pointer"
          title="Zoom In Mars Orbiter Map"
        >
          [+]
        </button>
        <button 
          onClick={() => setZoomFactor(prev => Math.max(0.7, prev - 0.1))}
          className="p-1 hover:bg-neutral-900 border border-neutral-800 text-brand-beige rounded text-[9px] font-bold font-mono transition-colors cursor-pointer"
          title="Zoom Out Mars Orbiter Map"
        >
          [-]
        </button>
        <button 
          onClick={() => setRotation({ x: 0.2, y: Math.random() * Math.PI * 2 })}
          className="p-1 hover:bg-neutral-900 border border-neutral-800 text-brand-teal rounded text-[9px] font-bold font-mono transition-colors cursor-pointer"
          title="Manual Reset Sol orientation"
        >
          [RST]
        </button>
      </div>

      <div className="absolute bottom-2 left-2 z-20 pointer-events-none md:block hidden">
        <div className="bg-neutral-950/80 border border-neutral-900/50 p-2 rounded text-[8px] font-mono text-neutral-500 text-left">
          <span>{isArabic ? "اضغط واسحب لتدوير الكوكب" : "DRAG PLANET TO ROTATE"}</span>
        </div>
      </div>

      {/* Decorative futuristic circular bracket frames */}
      <div className="absolute inset-0 pointer-events-none border border-dashed border-neutral-900/40 rounded-full scale-102 animate-pulse" />
      <div className="absolute inset-2 pointer-events-none border border-neutral-900/15 rounded-full scale-105" />
    </div>
  );
}
