import { AlertTriangle, BarChart3, Clock, Target } from 'lucide-react';

const blocks = [
  { icon: AlertTriangle, title: 'Fragmented Agencies', desc: "Your PPC agency blames the site. Your dev agency blames the traffic. No one owns the P&L." },
  { icon: Clock, title: 'Unclear Priorities', desc: "You have a backlog of 50 ideas but don't know which one will actually move the needle this month." },
  { icon: BarChart3, title: 'Tracking Confusion', desc: "GA4 says one thing. Shopify says another. You're flying blind on profit margins." },
  { icon: Target, title: 'Leaky Funnel', desc: "Traffic is arriving, but mobile conversion is stuck. You need UX fixes, not just more ad spend." },
];

export function JobsFamiliar({ heading = 'Any of this familiar?' }: { heading?: string }) {
  return (
    <section className="py-20 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-10 text-center">{heading}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blocks.map((item) => (
              <div key={item.title} className="bg-brand-surface border border-white/5 p-6 rounded-xl hover:border-red-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-brand-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
