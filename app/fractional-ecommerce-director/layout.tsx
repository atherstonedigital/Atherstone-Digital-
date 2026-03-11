import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire a Fractional Ecommerce Director | Shopify Brands £500k–£5M',
  description: 'Replace your agency roster with one senior Shopify director. Strategy, dev & growth from £3,000/mo. Max 3 partners. Based in the UK.',
  alternates: {
    canonical: 'https://atherstonedigital.com/fractional-ecommerce-director/',
  },
  openGraph: {
    title: 'Hire a Fractional Ecommerce Director | Shopify Brands £500k–£5M',
    description: 'Replace your agency roster with one senior Shopify director. Strategy, dev & growth from £3,000/mo. Max 3 partners. Based in the UK.',
    url: 'https://atherstonedigital.com/fractional-ecommerce-director/',
    type: 'website',
  },
};

export default function FractionalDirectorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
