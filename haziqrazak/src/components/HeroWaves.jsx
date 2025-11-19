
import React, { useRef, useEffect } from "react";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Helper for ripples
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default function HeroWaves() {
  const canvasRef = useRef();
  const textRef = useRef();
  const [cursorHidden, setCursorHidden] = React.useState(false);

  // ...existing code...

  // Flowy, wavy metaball blob state
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let prevMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseVel = { x: 0, y: 0, speed: 0, angle: 0 };
  let idle = true;
  let brownian = { x: mouse.x, y: mouse.y, vx: 0, vy: 0 };
  let blob = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    baseR: 90, // smaller blob
    r: 90,
    alpha: 0,
    points: Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 90,
      noise: Math.random() * 1000,
    })),
  };
  let lastMove = Date.now();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;

    // Cursor hide/show logic
    const handleEnter = () => setCursorHidden(true);
    const handleLeave = () => setCursorHidden(false);
    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    // Resize canvas
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse move: update blob target
    const handleMouseMove = (e) => {
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Calculate velocity
      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      mouseVel.x = dx;
      mouseVel.y = dy;
      mouseVel.speed = Math.sqrt(dx * dx + dy * dy);
      mouseVel.angle = Math.atan2(dy, dx);
      lastMove = Date.now();
      blob.alpha = 1;
      idle = false;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    function draw() {
      // Animate blob position
      let now = Date.now();
      if (now - lastMove > 900) {
        // Idle: Brownian motion, blob is detached and moves freely
        idle = true;
        // Random walk
        brownian.vx += (Math.random() - 0.5) * 0.7;
        brownian.vy += (Math.random() - 0.5) * 0.7;
        // Damping
        brownian.vx *= 0.98;
        brownian.vy *= 0.98;
        brownian.x += brownian.vx;
        brownian.y += brownian.vy;
        // Stay in bounds of hero section (canvas)
        brownian.x = Math.max(blob.r, Math.min(width - blob.r, brownian.x));
        brownian.y = Math.max(blob.r, Math.min(height - blob.r, brownian.y));
        blob.x = lerp(blob.x, brownian.x, 0.04); // slower float
        blob.y = lerp(blob.y, brownian.y, 0.04);
      } else {
        // Cursor active: attach blob to cursor
        blob.x = lerp(blob.x, mouse.x, 0.08);
        blob.y = lerp(blob.y, mouse.y, 0.08);
        // Instantly reattach brownian to cursor
        brownian.x = mouse.x;
        brownian.y = mouse.y;
        brownian.vx = 0;
        brownian.vy = 0;
      }
      // Blob grows with movement, shrinks when stopped
  let speed = Math.sqrt((blob.x - mouse.x) ** 2 + (blob.y - mouse.y) ** 2);
  let targetR = blob.baseR + Math.min(speed * 12, 40);
  blob.r = lerp(blob.r, targetR, 0.07); // slower radius change
      // Fade out if mouse hasn't moved for 0.7s
  // Always keep blob visible
  blob.alpha = 1;

      // Draw wavy gray background
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const y =
            (height / 18) * i +
            Math.sin((x / 120) + (Date.now() / 1200) + i) * 18 +
            Math.cos((x / 80) - (Date.now() / 1800) + i) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(180,180,180,${0.13 + 0.13 * Math.sin(Date.now() / 900 + i)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      ctx.restore();

      // Draw flowy metaball blob
      if (blob.alpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = blob.alpha;
        ctx.globalCompositeOperation = "lighter";
        // Animate points
        const t = Date.now() / 900;
        for (let i = 0; i < blob.points.length; i++) {
          const p = blob.points[i];
          // Angle of this point in world space
          const px = blob.x + Math.cos(p.angle) * blob.r;
          const py = blob.y + Math.sin(p.angle) * blob.r;
          // Distance and direction to cursor
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // If this point is near the cursor, bulge out more
          let cursorEffect = 0;
          if (dist < blob.r * 1.2) {
            cursorEffect = (1 - dist / (blob.r * 1.2)) * 38;
          }
          // Physics: squish if near screen edge
          let edgeEffect = 0;
          const margin = 40;
          if (px < margin) edgeEffect = -(margin - px) * 0.7;
          if (px > width - margin) edgeEffect = -(px - (width - margin)) * 0.7;
          if (py < margin) edgeEffect = -(margin - py) * 0.7;
          if (py > height - margin) edgeEffect = -(py - (height - margin)) * 0.7;

          // Velocity effect: stretch peaks in direction of movement
          let velocityEffect = 0;
          if (!idle && mouseVel.speed > 0.5) {
            // Angle between this point and velocity direction
            let angleDiff = Math.atan2(Math.sin(p.angle - mouseVel.angle), Math.cos(p.angle - mouseVel.angle));
            // Peaks in direction of movement are stretched, valleys lag
            velocityEffect = Math.cos(angleDiff) * mouseVel.speed * 7;
          }

          // Deeper but not extreme valleys/peaks
          p.radius = blob.r
            + Math.sin(t + p.angle * 2 + p.noise) * 54
            + Math.cos(t * 1.3 + p.angle + p.noise) * 32
            + cursorEffect
            + edgeEffect
            + velocityEffect;
        }
        // Draw smooth closed path with quadratic curves between midpoints
        ctx.beginPath();
        let prev = blob.points[blob.points.length - 1];
        for (let i = 0; i < blob.points.length; i++) {
          const curr = blob.points[i];
          const prevAngle = prev.angle, prevR = prev.radius;
          const currAngle = curr.angle, currR = curr.radius;
          const prevX = blob.x + Math.cos(prevAngle) * prevR;
          const prevY = blob.y + Math.sin(prevAngle) * prevR;
          const currX = blob.x + Math.cos(currAngle) * currR;
          const currY = blob.y + Math.sin(currAngle) * currR;
          const midX = (prevX + currX) / 2;
          const midY = (prevY + currY) / 2;
          if (i === 0) ctx.moveTo(midX, midY);
          else ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          prev = curr;
        }
        // Close the curve
        const first = blob.points[0];
        const firstAngle = first.angle, firstR = first.radius;
        const firstX = blob.x + Math.cos(firstAngle) * firstR;
        const firstY = blob.y + Math.sin(firstAngle) * firstR;
        const last = blob.points[blob.points.length - 1];
        const lastAngle = last.angle, lastR = last.radius;
        const lastX = blob.x + Math.cos(lastAngle) * lastR;
        const lastY = blob.y + Math.sin(lastAngle) * lastR;
        const lastMidX = (lastX + firstX) / 2;
        const lastMidY = (lastY + firstY) / 2;
        ctx.quadraticCurveTo(lastX, lastY, lastMidX, lastMidY);
        ctx.closePath();
        // Fill with a uniform soft gray (no white center)
        ctx.fillStyle = "rgba(180,180,180,0.13)";
        ctx.shadowColor = "rgba(220,220,220,0.22)";
        ctx.shadowBlur = 48;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();


  // Custom cursor: hide only if inside hero
  if (canvasRef.current) {
    canvasRef.current.style.cursor = cursorHidden ? "none" : "auto";
  }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("mouseenter", handleEnter);
        canvas.removeEventListener("mouseleave", handleLeave);
        canvas.style.cursor = "auto";
      }
    };
  }, []);



  // WavyText component for smooth, continuous animation
  function WavyText({ text, className }) {
    const [tick, setTick] = React.useState(0);
    useEffect(() => {
      let frame;
      const animate = () => {
        setTick(performance.now());
        frame = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(frame);
    }, []);
    return (
      <span className={className} style={{ display: "inline-flex" }}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${Math.sin(tick / 600 + i * 0.5) * 14}px)`,
              transition: "transform 0.1s",
              willChange: "transform"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden select-none" id="hero" data-section="hero">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div
        className="relative z-10 flex justify-center items-center"
        style={{ pointerEvents: "none" }}
      >
        <h1
          ref={textRef}
          className="flex text-white text-6xl md:text-8xl font-extrabold tracking-tight text-center"
          style={{ mixBlendMode: "difference", color: "#fff" }}
        >
          <WavyText text="Haziq Razak" />
        </h1>
      </div>
    </section>
  );
}
