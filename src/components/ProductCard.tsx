import { Plus, Star, Zap } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickBuy }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1">
      <div
        className="aspect-square overflow-hidden bg-gray-50 relative cursor-pointer"
        onClick={() => product.stock > 0 && onQuickBuy(product)}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span className="text-4xl font-bold">?</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-400 text-gray-900 text-[10px] sm:text-xs font-semibold">
            精选
          </span>
        )}
        {product.stock > 0 && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-gray-900 font-semibold text-xs sm:text-sm shadow-lg sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              立即购买
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">缺货</span>
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-[10px] sm:text-xs text-gray-300">·</span>
          <span className="text-[10px] sm:text-xs text-gray-500">{product.category}</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2 sm:mb-3 hidden sm:block">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ¥{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-all active:scale-90 sm:hover:scale-110 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 sm:disabled:hover:scale-100"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
