import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RevealText = ({ children, className = "", as: Tag = "div" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const originalHTML = container.innerHTML;
    
    // Envolver cada palabra en un span
    const words = container.textContent.split(/\s+/).filter(word => word.length > 0);
    const wrappedHTML = words.map(word => 
      `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:top;">
        <span class="word-inner" style="display:inline-block;transform:translateY(100%);">
          ${word}&nbsp;
        </span>
      </span>`
    ).join('');

    container.innerHTML = wrappedHTML;

    // Animar todas las palabras a la vez
    const wordElements = container.querySelectorAll('.word-inner');
    gsap.to(wordElements, {
      y: "0%",
      duration: 1,
      ease: "power3.out",
      stagger: 0, // TODOS JUNTOS
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        once: true,
      },
    });

    // Cleanup opcional
    return () => {
      container.innerHTML = originalHTML;
    };

  }, []);

  return (
    <Tag ref={containerRef} className={`word-reveal ${className}`}>
      {children}
    </Tag>
  );
};

export default RevealText;