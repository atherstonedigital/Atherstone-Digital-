import Link from 'next/link';
import { LOCATIONS_DATA } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-muted py-12 border-t border-brand-border relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-brand-primary/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          <div className="text-center md:text-left max-w-sm">
            <div className="font-display font-bold text-xl text-white tracking-tighter mb-3">
              ATHERSTONE<span className="text-brand-primary">.</span>
            </div>
            <p className="text-sm mb-4 leading-relaxed">
              Fractional Ecommerce Director for Shopify Brands.<br />
              Midlands HQ (Warwickshire, CV9).<br />
              Serving the UK & Global Partners.
            </p>
            <p className="text-xs opacity-60 mb-1">Company Number: 14742215</p>
            <p className="text-xs opacity-60">&copy; {new Date().getFullYear()} Atherstone Digital.</p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold text-white text-sm mb-3">Local Service Area (Midlands)</h4>
            <ul className="text-xs text-brand-muted space-y-1.5 grid grid-cols-2 gap-x-8 md:block md:gap-0">
              {LOCATIONS_DATA.map((loc) => (
                <li key={loc.city}>
                  <Link href={`/${loc.slug}`} className="hover:text-brand-primary transition-colors">
                    {loc.city} & Surrounding
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:items-end gap-4 text-center md:text-right w-full md:w-auto">
            <div className="space-y-1 text-sm font-medium">
              <a href="mailto:info@atherstonedigital.com" className="block text-white hover:text-brand-primary transition-colors">info@atherstonedigital.com</a>
              <a href="tel:07810838129" className="block text-white hover:text-brand-primary transition-colors">07810 838 129</a>
            </div>
            <div className="flex justify-center md:justify-end gap-6 text-sm pt-4 border-t border-white/5 w-full">
              <a href="https://www.linkedin.com/in/danlegresley/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
              <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms</Link>
              <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
