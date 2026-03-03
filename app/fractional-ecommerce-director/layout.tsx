import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fractional Ecommerce Director for Shopify Brands | Pricing & Details',
  description: 'Hire a Fractional Ecommerce Director from £3,000/month. Senior Shopify strategy, CRO, paid media, Klaviyo, and n8n automation. Replace your agency with one senior partner.',
  alternates: {
    canonical: 'https://atherstonedigital.com/fractional-ecommerce-director',
  },
  openGraph: {
    title: 'Fractional Ecommerce Director for Shopify Brands | Pricing & Details',
    description: 'Hire a Fractional Ecommerce Director from £3,000/month. Senior Shopify strategy, CRO, paid media, Klaviyo, and n8n automation. Replace your agency with one senior partner.',
    url: 'https://atherstonedigital.com/fractional-ecommerce-director',
    type: 'website',
  },
};

export default function FractionalDirectorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
