'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice()) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mouseX}px`;
        cursorDotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', moveCursor);
    animateCursor();

    const handleHover = () => cursorRef.current?.classList.add('scale-150');
    const handleLeave = () => cursorRef.current?.classList.remove('scale-150');
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-8 h-8 border border-brand-primary/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hidden md:block" />
      <div ref={cursorDotRef} className="fixed w-1.5 h-1.5 bg-brand-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
}
