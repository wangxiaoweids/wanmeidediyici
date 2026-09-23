import { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Loader2, PackageSearch } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const cart = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError('商品加载失败，请稍后重试。');
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleCheckout = () => {
    cart.setIsOpen(false);
    setCheckoutOpen(true);
  };

  const handleQuickBuy = (product: Product) => {
    cart.addToCart(product);
    cart.setIsOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    cart.clearCart();
    setCheckoutOpen(false);
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.totalItems}
        onCartClick={() => cart.setIsOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <Hero onShopNow={scrollToProducts} />

      <main ref={productsRef} className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex items-center justify-between mb-5 sm:mb-8 flex-wrap gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {selectedCategory === 'All' ? '全部商品' : selectedCategory}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {filteredProducts.length} 件商品
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">排序：</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors"
            >
              <option value="featured">精选推荐</option>
              <option value="price-low">价格从低到高</option>
              <option value="price-high">价格从高到低</option>
              <option value="rating">好评优先</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            <p className="text-sm text-gray-500">正在加载商品...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <PackageSearch className="w-12 h-12 text-gray-300" />
            <p className="text-sm text-gray-500">没有找到商品，试试其他搜索或分类。</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={cart.addToCart}
                onQuickBuy={handleQuickBuy}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-gray-900">亮选</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 亮选商城. 保留所有权利。
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        subtotal={cart.subtotal}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
}

export default App;
