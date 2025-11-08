import Spline from '@splinetool/react-spline';
import { Shield, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <Shield className="w-4 h-4" />
            <span>AI-powered Email Security</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Catch phishing before it catches you
          </h1>
          <p className="text-white/80 max-w-prose">
            Paste an email, press classify, and see the verdict with explanations powered by a hybrid ML + rules engine.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Subject + Body + Headers</div>
            <div className="inline-flex items-center gap-2"><Shield className="w-4 h-4" /> Verdict & Reasons</div>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
    </section>
  );
}
