'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data';
import { siteConfig } from '@/lib/siteConfig';
import { useTheme } from '@/components/ThemeProvider';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const { theme, toggleTheme } = useTheme();
  const isActive = (href: string) => pathname === href;
  const closeMobile = () => { setMobileMenuOpen(false); setMobileServicesOpen(false); };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${
      scrolled ? 'bg-brand-dark/80 backdrop-blur-md border-b border-brand-border py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center pointer-events-none">

        <Link href="/" className="flex items-center gap-2 group pointer-events-auto">
          <div className="font-display font-bold text-2xl tracking-tighter text-white">
            ATHERSTONE<span className="text-brand-primary group-hover:text-brand-accent transition-colors">.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 pointer-events-auto">
          <Link href="/fractional-ecommerce-director" onClick={closeMobile}
            className={`text-sm font-medium transition-colors tracking-wide ${isActive('/fractional-ecommerce-director') ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}>
            Fractional Director
          </Link>

          <div className="relative group">
            <Link href="/services"
              className={`text-sm font-medium transition-colors tracking-wide flex items-center gap-1 py-4 cursor-pointer ${isActive('/services') ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}>
              Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-brand-dark/95 backdrop-blur-xl border border-brand-border rounded-xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50">
              <div className="grid gap-1">
                {SERVICES_DATA.map((service) => (
                  <Link key={service.id} href={`/services/${service.slug}`} onClick={closeMobile}
                    className="block px-4 py-3 group/item hover:bg-white/5 rounded-lg transition-colors">
                    <div className="font-medium text-white group-hover/item:text-brand-primary transition-colors text-sm">{service.title}</div>
                    <div className="text-xs text-brand-muted/70 mt-0.5 truncate">{service.outcome}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/why-fractional" onClick={closeMobile}
            className={`text-sm font-medium transition-colors tracking-wide ${isActive('/why-fractional') ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}>
            Why Fractional?
          </Link>
          <Link href="/results" onClick={closeMobile}
            className={`text-sm font-medium transition-colors tracking-wide ${isActive('/results') ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}>
            Results
          </Link>
          <Link href="/blog" onClick={closeMobile}
            className={`text-sm font-medium transition-colors tracking-wide ${isActive('/blog') ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}>
            Blog
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/30 hover:bg-brand-primary/10 transition-all text-brand-muted hover:text-brand-primary"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href={siteConfig.cta.url} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-brand-primary text-brand-dark font-bold text-sm rounded-lg hover:bg-brand-accent transition-colors pointer-events-auto shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]">
            {siteConfig.cta.label}
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-brand-muted hover:text-white transition-colors pointer-events-auto"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-dark/95 backdrop-blur-xl border-t border-brand-border pointer-events-auto">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link href="/fractional-ecommerce-director" onClick={closeMobile} className="text-white font-medium py-2 border-b border-brand-border">Fractional Director</Link>
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} aria-expanded={mobileServicesOpen} className="text-white font-medium py-2 border-b border-brand-border flex justify-between items-center w-full">
              Services <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 flex flex-col gap-2">
                {SERVICES_DATA.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}`} onClick={closeMobile} className="text-brand-muted hover:text-brand-primary text-sm py-1">{s.title}</Link>
                ))}
              </div>
            )}
            <Link href="/why-fractional" onClick={closeMobile} className="text-white font-medium py-2 border-b border-brand-border">Why Fractional?</Link>
            <Link href="/results" onClick={closeMobile} className="text-white font-medium py-2 border-b border-brand-border">Results</Link>
            <Link href="/blog" onClick={closeMobile} className="text-white font-medium py-2 border-b border-brand-border">Blog</Link>
            <div className="flex items-center justify-between py-2 border-b border-brand-border">
              <span className="text-white font-medium">Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/30 text-brand-muted hover:text-brand-primary transition-all"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <a href={siteConfig.cta.url} target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="w-full text-center px-6 py-3 bg-brand-primary text-brand-dark font-bold rounded-lg mt-2">{siteConfig.cta.label}</a>
          </div>
        </div>
      )}
    </header>
  );
}
