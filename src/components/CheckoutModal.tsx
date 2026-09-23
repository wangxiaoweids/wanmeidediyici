import { useState } from 'react';
import { X, Check, CreditCard, Lock, Loader2, Wallet, Smartphone } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  onComplete: () => void;
}

type PaymentMethod = 'card' | 'wechat' | 'alipay';

export function CheckoutModal({ isOpen, onClose, subtotal, onComplete }: CheckoutModalProps) {
  const [status, setStatus] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wechat');
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvc: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onComplete();
        setStatus('form');
        setForm({ email: '', name: '', address: '', city: '', zip: '', card: '', expiry: '', cvc: '' });
      }, 2000);
    }, 1800);
  };

  const shipping = subtotal > 100 ? 0 : 8.99;
  const total = subtotal + shipping;

  const paymentOptions: { id: PaymentMethod; label: string; icon: typeof CreditCard; color: string }[] = [
    { id: 'wechat', label: '微信支付', icon: Wallet, color: 'text-green-500' },
    { id: 'alipay', label: '支付宝', icon: Smartphone, color: 'text-blue-500' },
    { id: 'card', label: '银行卡', icon: CreditCard, color: 'text-gray-600' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] overflow-y-auto safe-bottom">
        {status === 'success' ? (
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">订单已确认！</h2>
            <p className="text-gray-500 text-sm">
              感谢您的购买。确认邮件已发送至您的邮箱。
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10 safe-top">
              <h2 className="text-lg font-bold text-gray-900">结算</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors active:scale-90"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="sm:hidden flex justify-center pt-2">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  联系方式
                </h3>
                <input
                  type="email"
                  required
                  placeholder="邮箱地址"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  收货地址
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="姓名"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="详细地址"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="城市"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                    />
                    <input
                      type="text"
                      required
                      placeholder="邮编"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  支付方式
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {paymentOptions.map((opt) => {
                      const Icon = opt.icon;
                      const selected = paymentMethod === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={`flex flex-col items-center gap-1.5 py-2.5 sm:py-3 rounded-xl border-2 transition-all active:scale-95 ${
                            selected
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${opt.color}`} />
                          <span className={`text-xs font-medium ${selected ? 'text-gray-900' : 'text-gray-500'}`}>
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 pt-1">
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="卡号"
                          value={form.card}
                          onChange={(e) => setForm({ ...form, card: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="月 / 年"
                          value={form.expiry}
                          onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                        />
                        <input
                          type="text"
                          required
                          placeholder="安全码"
                          value={form.cvc}
                          onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wechat' && (
                    <div className="flex flex-col items-center gap-3 py-4 px-4 bg-green-50 rounded-xl">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                        <div className="grid grid-cols-8 grid-rows-8 gap-0.5 w-20 h-20 sm:w-24 sm:h-24">
                          {Array.from({ length: 64 }).map((_, i) => {
                            const pattern = [
                              0,1,1,1,1,1,1,0,
                              1,0,0,0,0,0,0,1,
                              1,0,1,1,1,1,0,1,
                              1,0,1,0,0,1,0,1,
                              1,0,1,1,1,1,0,1,
                              1,0,0,0,0,0,0,1,
                              1,0,1,1,1,1,0,1,
                              0,1,1,1,1,1,1,0,
                            ];
                            return (
                              <div
                                key={i}
                                className={pattern[i] ? 'bg-green-600 rounded-[1px]' : 'bg-transparent'}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">请使用微信扫描二维码完成支付</p>
                    </div>
                  )}

                  {paymentMethod === 'alipay' && (
                    <div className="flex flex-col items-center gap-3 py-4 px-4 bg-blue-50 rounded-xl">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                        <div className="grid grid-cols-8 grid-rows-8 gap-0.5 w-20 h-20 sm:w-24 sm:h-24">
                          {Array.from({ length: 64 }).map((_, i) => {
                            const pattern = [
                              0,0,1,1,1,1,0,0,
                              0,1,0,0,0,0,1,0,
                              1,0,1,1,1,1,0,1,
                              1,0,0,0,0,0,0,1,
                              1,0,1,1,1,1,0,1,
                              0,1,0,1,1,0,1,0,
                              0,0,1,0,0,1,0,0,
                              0,1,1,1,1,1,1,0,
                            ];
                            return (
                              <div
                                key={i}
                                className={pattern[i] ? 'bg-blue-600 rounded-[1px]' : 'bg-transparent'}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">请使用支付宝扫描二维码完成支付</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>小计</span>
                  <span>¥{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>运费</span>
                  <span>{shipping === 0 ? '免运费' : `¥${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                  <span>合计</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'processing'}
                className="w-full py-3.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    处理中...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    支付 ¥{total.toFixed(2)}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                安全支付 · 您的数据受保护
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
