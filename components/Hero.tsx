'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Terminal, Cpu, TrendingUp } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { useTheme } from '@/components/ThemeProvider';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const initTimeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      };
      resize();
      window.addEventListener('resize', resize);

      const isMobile = width < 768;
      const particleCount = isMobile ? 30 : 80;
      const connectionDistance = isMobile ? 100 : 150;
      const mouseDistance = 250;

      const light = document.documentElement.classList.contains('light');

      interface Particle { x: number; y: number; vx: number; vy: number; size: number; }
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 2 + 1 });
      }

      let mouseX = -1000, mouseY = -1000;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      let animId: number;
      const render = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dxM = p.x - mouseX, dyM = p.y - mouseY;
          const distMSq = dxM * dxM + dyM * dyM;
          const mDistSq = mouseDistance * mouseDistance;

          if (distMSq < mDistSq) {
            const d = Math.sqrt(distMSq);
            const force = (mouseDistance - d) / mouseDistance;
            p.vx += (dxM / d) * force * 0.05;
            p.vy += (dyM / d) * force * 0.05;
          }

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x, dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < connectionDistance * connectionDistance) {
              const dist = Math.sqrt(distSq);
              const opacity = 1 - dist / connectionDistance;
              ctx.beginPath();
              if (light) {
                ctx.strokeStyle = distMSq < mDistSq ? `rgba(5,150,105,${opacity * 0.5})` : `rgba(5,150,105,${opacity * 0.15})`;
              } else {
                ctx.strokeStyle = distMSq < mDistSq ? `rgba(74,222,128,${opacity * 0.6})` : `rgba(74,222,128,${opacity * 0.2})`;
              }
              ctx.lineWidth = distMSq < mDistSq ? 1.5 : 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          if (light) {
            ctx.fillStyle = distMSq < mDistSq ? 'rgba(5,150,105,0.6)' : 'rgba(5,150,105,0.25)';
          } else {
            ctx.fillStyle = distMSq < mDistSq ? 'rgba(204,240,120,0.8)' : 'rgba(74,222,128,0.4)';
          }
          ctx.fill();
        }
        animId = requestAnimationFrame(render);
      };
      render();

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animId);
      };
    }, 100);
    return () => clearTimeout(initTimeout);
  }, [theme]);

  const bgColor = isLight ? '#f0fdf4' : '#020604';

  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-32" style={{ backgroundColor: bgColor }}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-auto" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80" style={{ background: `linear-gradient(to bottom, ${bgColor}, transparent, ${bgColor})` }}></div>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90" style={{ background: `radial-gradient(circle at center, transparent 0%, ${bgColor} 100%)` }}></div>
      {!isLight && (
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
      )}

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

        <div className="flex flex-col items-center gap-2 mb-10">
          <div className={`inline-flex items-center gap-3 px-4 py-2 border rounded-md backdrop-blur-md ${isLight ? 'bg-white/60 border-brand-primary/20 shadow-sm' : 'bg-black/40 border-brand-primary/30 shadow-[0_0_15px_rgba(74,222,128,0.1)]'}`}>
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 bg-brand-primary ${isLight ? '' : 'shadow-[0_0_8px_#4ADE80]'}`}></span>
            </div>
            <span className="text-brand-primary font-mono text-xs md:text-sm tracking-wider">
              CURRENT CAPACITY: <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{siteConfig.capacity.filled}/{siteConfig.capacity.total} PARTNERS</span>
            </span>
            <div className="flex items-center gap-1 ml-1">
              {Array.from({ length: siteConfig.capacity.total }).map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i < siteConfig.capacity.filled ? `bg-brand-primary ${isLight ? '' : 'shadow-[0_0_6px_#4ADE80]'}` : isLight ? 'bg-gray-200 border border-gray-300' : 'bg-white/10 border border-white/20'}`} />
              ))}
            </div>
          </div>
          <div className={`text-[10px] md:text-xs font-mono tracking-widest uppercase ${isLight ? 'text-gray-500' : 'text-brand-muted/70'}`}>
            &gt;&gt; 1 SLOT REMAINING
          </div>
        </div>

        <div className="mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className={`inline-block px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] border rounded-full backdrop-blur-sm ${isLight ? 'text-gray-500 border-gray-300 bg-white/50' : 'text-brand-muted border-white/10 bg-white/[0.03]'}`}>
            AI-Augmented · Shopify-Native · UK-Based
          </span>
        </div>

        <div className="max-w-6xl mx-auto text-center mb-6 relative">
          {!isLight && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none"></div>}
          <h1 className={`relative font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight ${isLight ? 'text-gray-900' : 'text-white drop-shadow-2xl'}`}>
            Your Fractional Ecommerce Director for <span className="text-brand-primary">Shopify.</span>
          </h1>
        </div>

        <p className={`text-xl md:text-2xl font-medium mb-10 leading-relaxed max-w-3xl mx-auto text-center opacity-0 animate-fade-in ${isLight ? 'text-gray-800' : 'text-brand-text'}`} style={{ animationDelay: '0.2s' }}>
          One senior operator. A stack of AI agents doing the grunt work. The cost structure that makes it possible.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in w-full sm:w-auto" style={{ animationDelay: '0.5s' }}>
          <a href={siteConfig.cta.url} target="_blank" rel="noopener noreferrer" className={`group relative w-full sm:w-auto px-10 py-5 bg-brand-primary font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-[1.02] flex items-center justify-center gap-3 ${isLight ? 'text-white shadow-lg' : 'text-brand-dark shadow-[0_0_40px_rgba(74,222,128,0.3)] hover:shadow-[0_0_60px_rgba(74,222,128,0.5)]'}`}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12"></div>
            <span className="relative z-10 flex items-center gap-2">{siteConfig.cta.label} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
          </a>
          <Link href="/why-fractional" className={`w-full sm:w-auto px-10 py-5 font-medium text-lg rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-md group/btn ${isLight ? 'bg-gray-900/5 hover:bg-gray-900/10 text-gray-900 border border-gray-300 hover:border-brand-primary/30' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-primary/30'}`}>
            See How the Economics Work
            <ArrowRight size={18} className="text-brand-muted group-hover/btn:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-4xl opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          {[
            { icon: Cpu, text: 'Shopify Plus Architect', sub: 'Enterprise Scale' },
            { icon: Terminal, text: 'n8n Automation', sub: 'Custom Agent Workflows' },
            { icon: TrendingUp, text: 'Google Ads Certified', sub: 'ROAS Engineering' },
          ].map((item, idx) => (
            <div key={idx} className={`group flex flex-col items-center gap-3 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:border-brand-primary/20 ${isLight ? 'bg-white/60 border-gray-200 hover:shadow-md' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(74,222,128,0.05)]'}`}>
              <div className="p-3 rounded-full bg-brand-primary/5 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                <item.icon size={24} />
              </div>
              <div className="text-center">
                <div className={`font-medium font-display ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.text}</div>
                <div className={`text-xs uppercase tracking-wider mt-1 ${isLight ? 'text-gray-500' : 'text-brand-muted'}`}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-none opacity-50">
        <ChevronDown size={32} className="text-brand-muted" />
      </div>
    </section>
  );
}
