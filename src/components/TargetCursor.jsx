import { useEffect, useRef, useCallback, useMemo } from "react";

const CleanCursor = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const trailRef = useRef([]);
  const maxTrailLength = 20;

  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    // Limpiar pantalla completamente
    ctx.clearRect(0, 0, width, height);

    // Suavizado de movimiento
    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.2;
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.2;

    // Agregar nuevo punto al trail
    trailRef.current.push({
      x: smoothRef.current.x,
      y: smoothRef.current.y
    });

    // Mantener solo los últimos puntos
    if (trailRef.current.length > maxTrailLength) {
      trailRef.current.shift();
    }

    // Dibujar la línea trazada como UNA SOLA LÍNEA CONTINUA
    if (trailRef.current.length > 1) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Mover al primer punto
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

      // Crear gradiente lineal para la línea en BLANCO
      const gradient = ctx.createLinearGradient(
        trailRef.current[0].x, trailRef.current[0].y,
        trailRef.current[trailRef.current.length - 1].x, 
        trailRef.current[trailRef.current.length - 1].y
      );
      
      // Añadir stops de color BLANCO con opacidad variable
      for (let i = 0; i < trailRef.current.length; i++) {
        const progress = i / (trailRef.current.length - 1);
        const alpha = 0.1 + (progress * 0.9); // Más opaco hacia el final
        gradient.addColorStop(progress, `rgba(255, 255, 255, ${alpha})`);
      }

      ctx.strokeStyle = gradient;

      // Dibujar línea continua a través de TODOS los puntos
      for (let i = 1; i < trailRef.current.length; i++) {
        ctx.lineTo(trailRef.current[i].x, trailRef.current[i].y);
      }

      // Trazar la línea completa de una vez
      ctx.stroke();
    }

    animRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouse = useCallback((e) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  const handleMouseLeave = useCallback(() => {
    trailRef.current = [];
  }, []);

  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    initCanvas();

    smoothRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    trailRef.current = [];

    animRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", initCanvas);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile, initCanvas, animate, handleMouse, handleMouseLeave]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ background: "transparent" }}
    />
  );
};

export default CleanCursor;