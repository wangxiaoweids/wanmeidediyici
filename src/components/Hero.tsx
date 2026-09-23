import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            新品上市
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-5">
            精选好物，<br />
            <span className="text-amber-400">轻松购物。</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-lg">
            精选数码、服饰与生活好物。品质触手可及，价格诚意十足。
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={onShopNow}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all active:scale-95 sm:hover:scale-105"
            >
              立即选购
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="flex -space-x-2">
                {['bg-amber-400', 'bg-blue-400', 'bg-green-400', 'bg-pink-400'].map((c, i) => (
                  <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${c} border-2 border-gray-900`} />
                ))}
              </div>
              <span>超过一万满意顾客</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
