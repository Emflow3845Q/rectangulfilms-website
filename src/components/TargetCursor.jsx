import { useEffect, useRef, useCallback, useMemo } from 'react';

const CleanCursor = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const isMovingRef = useRef(false);
  
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  // Partícula que no deja rastro
  class CleanParticle {
    constructor(x, y, velocity) {
      this.x = x;
      this.y = y;
      this.vx = velocity.x * 0.4;
      this.vy = velocity.y * 0.4;
      this.size = Math.random() * 2 + 1;
      this.alpha = 1;
      this.life = 1;
      this.decay = 0.05; // Desaparece más rápido
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      this.alpha = this.life;
      
      return this.life > 0;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesRef.current = [];
  }, []);

  const calculateVelocity = useCallback((currentX, currentY, lastX, lastY) => {
    return {
      x: currentX - lastX,
      y: currentY - lastY
    };
  }, []);

  const createParticles = useCallback((x, y, velocity) => {
    if (!isMovingRef.current) return;

    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    
    if (speed > 2) {
      const particleCount = Math.min(Math.floor(speed * 0.2), 3);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(
          new CleanParticle(x, y, velocity)
        );
      }
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // LIMPIAR COMPLETAMENTE el canvas en cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar partículas
    particlesRef.current = particlesRef.current.filter(particle => {
      const isAlive = particle.update();
      if (isAlive) {
        particle.draw(ctx);
      }
      return isAlive;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;

    const velocity = calculateVelocity(
      currentX, 
      currentY, 
      lastMouseRef.current.x, 
      lastMouseRef.current.y
    );

    isMovingRef.current = true;
    
    setTimeout(() => {
      isMovingRef.current = false;
    }, 30);

    createParticles(currentX, currentY, velocity);
    lastMouseRef.current = { x: currentX, y: currentY };
    mouseRef.current = { x: currentX, y: currentY };
  }, [calculateVelocity, createParticles]);

  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    initCanvas();
    animate();

    lastMouseRef.current = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', initCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, initCanvas, animate, handleMouseMove]);

  if (isMobile) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ 
        background: 'transparent'
      }}
    />
  );
};

export default CleanCursor;