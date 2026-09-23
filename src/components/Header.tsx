import { ShoppingBag, Search } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function Header({
  cartCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-900 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              亮选
            </span>
          </div>

          <div className="flex-1 max-w-xl relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-all text-sm"
            />
          </div>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">购物车</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-gray-900 text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative sm:hidden pb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索商品..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-all text-sm"
          />
        </div>

        <nav className="flex items-center gap-1.5 pb-2.5 sm:pb-3 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
