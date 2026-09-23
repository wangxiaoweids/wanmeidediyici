import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 safe-top">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-900">购物车</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors active:scale-90"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm">购物车是空的</p>
            <button
              onClick={onClose}
              className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              继续选购
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    {item.product.image_url && (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      ¥{item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-gray-200 rounded-full">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900 shrink-0">
                    ¥{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4 sm:p-5 space-y-3 sm:space-y-4 safe-bottom">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">小计</span>
                <span className="text-xl font-bold text-gray-900">
                  ¥{subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                运费和税费在结算时计算。
              </p>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors active:scale-[0.98]"
              >
                去结算 · ¥{subtotal.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
