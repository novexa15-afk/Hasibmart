import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import {
  ShoppingBag, Search, Heart, User, ShoppingCart, Menu, X, ChevronRight,
  Star, Truck, ShieldCheck, RefreshCw, PhoneCall, CheckCircle2,
  SlidersHorizontal, Trash2, Plus, Minus, ArrowRight, Eye, Send,
  Package, LayoutDashboard, Settings, Edit3, PlusCircle, ExternalLink,
  ChevronDown, MapPin, CreditCard, Tag, Filter, Check, Clock, AlertCircle, Sparkles, AlertTriangle
} from 'lucide-react';

// ==========================================
// 1. STYLES & TYPOGRAPHY INJECTION
// ==========================================
const injectGlobalStyles = () => {
  if (document.getElementById('hasib-mart-global-styles')) return;
  const link = document.createElement('link');
  link.id = 'hasib-mart-global-styles';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.innerHTML = `
    * {
      font-family: 'Hind Siliguri', sans-serif;
    }
    body {
      background-color: #F5F3EE;
      color: #171717;
    }
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #F5F3EE;
    }
    ::-webkit-scrollbar-thumb {
      background: #E9E5DC;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #C6A15B;
    }
    .gold-gradient-text {
      background: linear-gradient(135deg, #D8BC7A 0%, #C6A15B 50%, #A88643 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gold-gradient-bg {
      background: linear-gradient(135deg, #D8BC7A 0%, #C6A15B 100%);
    }
  `;
  document.head.appendChild(style);
};

// ==========================================
// 2. INITIAL MOCK DATA
// ==========================================
const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'পোশাক', slug: 'fashion', icon: '👔', count: 42, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-2', name: 'জুতা', slug: 'shoes', icon: '👟', count: 28, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-3', name: 'ব্যাগ', slug: 'bags', icon: '🎒', count: 19, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-4', name: 'গ্যাজেট', slug: 'gadgets', icon: '⌚', count: 35, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-5', name: 'বিউটি', slug: 'beauty', icon: '💄', count: 24, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-6', name: 'হোম ও কিচেন', slug: 'home', icon: '🍳', count: 31, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-7', name: 'খেলনা', slug: 'toys', icon: '🧸', count: 16, image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=80' },
  { id: 'cat-8', name: 'অ্যাক্সেসরিজ', slug: 'accessories', icon: '🕶️', count: 22, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80' },
];

const INITIAL_PRODUCTS = [
  {
    id: 'p-101',
    name: 'প্রিমিয়াম প্রিমিয়াম মেটালিক স্মার্টওয়াচ - সিরিজ ৮ প্রো',
    category: 'gadgets',
    categoryName: 'গ্যাজেট',
    price: 3250,
    originalPrice: 4500,
    discount: 28,
    rating: 4.9,
    reviewsCount: 128,
    stock: 15,
    isPopular: true,
    isNew: true,
    isBestSeller: true,
    sku: 'HM-SW8-PRO',
    description: 'এইচডি ফুল টাচ ডিসপ্লে, হার্ট রেট মনিটর, ব্লুটুথ কলিং এবং ৭ দিনের ব্যাটারি ব্যাকআপ সহ প্রিমিয়াম স্মার্টওয়াচ। ওয়াটারপ্রুফ মেটালিক বডি।',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Black', hex: '#000000', label: 'ব্ল্যাক' },
      { name: 'Silver', hex: '#C0C0C0', label: 'সিলভার' },
      { name: 'Gold', hex: '#FFD700', label: 'গোল্ড' }
    ]
  },
  {
    id: 'p-102',
    name: 'মেনস রয়্যাল কটন ক্যাজুয়াল শার্ট - ফুল স্লিভ',
    category: 'fashion',
    categoryName: 'পোশাক',
    price: 1150,
    originalPrice: 1650,
    discount: 30,
    rating: 4.8,
    reviewsCount: 94,
    stock: 25,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    sku: 'HM-SHIRT-COT01',
    description: '১০০% পিওর প্রিমিয়াম কটন কাপড়ে তৈরি। প্রিমিয়াম ফিনিশিং, অত্যন্ত আরামদায়ক এবং গ্রীষ্ম বা শীত যেকোনো মৌসুমে ব্যবহারের উপযোগী।',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#000080', label: 'নেভি ব্লু' },
      { name: 'Black', hex: '#000000', label: 'ব্ল্যাক' },
      { name: 'White', hex: '#FFFFFF', label: 'হোয়াইট' },
      { name: 'Olive', hex: '#556B2F', label: 'অলিভ' }
    ]
  },
  {
    id: 'p-103',
    name: 'আল্ট্রা লাইটওয়েট স্পোর্টস রানিং স্নিকার্স',
    category: 'shoes',
    categoryName: 'জুতা',
    price: 2450,
    originalPrice: 3200,
    discount: 23,
    rating: 4.7,
    reviewsCount: 76,
    stock: 12,
    isPopular: true,
    isNew: true,
    isBestSeller: false,
    sku: 'HM-SNK-RUN09',
    description: 'অত্যন্ত আরামদায়ক এবং দীর্ঘস্থায়ী এন্টি-স্কিড সোল। রানিং, জিম ও দৈনন্দিন ব্যবহারের জন্য পারফেক্ট ক্যাজুয়াল স্নিকার্স।',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80'
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Red', hex: '#DC2626', label: 'রেড' },
      { name: 'Black', hex: '#000000', label: 'ব্ল্যাক' },
      { name: 'White', hex: '#FFFFFF', label: 'হোয়াইট' }
    ]
  },
  {
    id: 'p-104',
    name: 'মাল্টি-ফাংশনাল ল্যাপটপ ট্রাভেল ব্যাকপ্যাক',
    category: 'bags',
    categoryName: 'ব্যাগ',
    price: 1890,
    originalPrice: 2600,
    discount: 27,
    rating: 4.9,
    reviewsCount: 152,
    stock: 18,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    sku: 'HM-BAG-TRV02',
    description: 'ওয়াটারপ্রুফ অক্সফোর্ড ফেব্রিক, ইউএসবি চার্জিং পোর্ট, ১৫.৬ ইঞ্চি ল্যাপটপ চেম্বার এবং সিকিউরিটি কোড লক সিস্টেম।',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    ],
    sizes: ['Standard'],
    colors: [
      { name: 'Black', hex: '#000000', label: 'ব্ল্যাক' },
      { name: 'Grey', hex: '#808080', label: 'গ্রে' },
      { name: 'Navy', hex: '#000080', label: 'নেভি ব্লু' }
    ]
  },
  {
    id: 'p-105',
    name: 'এক্টিভ নয়েজ ক্যান্সেলেশন ওয়া্যারলেস বার্ডস',
    category: 'gadgets',
    categoryName: 'গ্যাজেট',
    price: 2150,
    originalPrice: 2990,
    discount: 28,
    rating: 4.6,
    reviewsCount: 88,
    stock: 30,
    isPopular: false,
    isNew: true,
    isBestSeller: true,
    sku: 'HM-TWS-ANC99',
    description: 'হাই-ফাই বেস, ৩০ ডেসিবেল একটিভ নয়েজ ক্যান্সেলেশন, ৩০ ঘণ্টা প্লেব্যাক টাইম এবং টাইপ-সি ফাস্ট চার্জিং।',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'],
    sizes: ['Free Size'],
    colors: [
      { name: 'White', hex: '#FFFFFF', label: 'হোয়াইট' },
      { name: 'Black', hex: '#000000', label: 'ব্ল্যাক' }
    ]
  },
  {
    id: 'p-106',
    name: 'লক্সারিয়াস ফ্রেগ্রেন্স অরিজিনাল পারফিউম - ১০০মি.লি.',
    category: 'beauty',
    categoryName: 'বিউটি',
    price: 1650,
    originalPrice: 2200,
    discount: 25,
    rating: 4.9,
    reviewsCount: 64,
    stock: 10,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    sku: 'HM-PRF-GOLD',
    description: 'দীর্ঘস্থায়ী প্রিমিয়াম উড ও মাস্কের সুবাস। লং-লাস্টিং সারাদিন ফ্রেশ রাখার নিশ্চয়তা। ১০০% অরিজিনাল।',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80'],
    sizes: ['100ml'],
    colors: [{ name: 'Gold', hex: '#FFD700', label: 'গোল্ড এডিশন' }]
  },
  {
    id: 'p-107',
    name: 'স্মার্ট এয়ার ফ্রায়ার ও কিচেন ব্লেন্ডার কম্বো',
    category: 'home',
    categoryName: 'হোম ও কিচেন',
    price: 5800,
    originalPrice: 7500,
    discount: 22,
    rating: 4.8,
    reviewsCount: 42,
    stock: 8,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    sku: 'HM-KIT-AIR01',
    description: '৮০% কম তেলে সুস্বাদু রান্না। ৪.৫ লিটার ক্যাপাসিটি ডিজিটাল টাচ প্যানেল এয়ার ফ্রায়ার। সাথে ১০০০ ওয়াট শক্তিশালী ব্লেন্ডার।',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80'],
    sizes: ['4.5 Litre'],
    colors: [{ name: 'Black', hex: '#000000', label: 'ব্ল্যাক গোল্ড' }]
  },
  {
    id: 'p-108',
    name: 'ক্লাসিক ইউভি প্রটেকশন সানগ্লাস - ইউভি৪০০',
    category: 'accessories',
    categoryName: 'অ্যাক্সেসরিজ',
    price: 850,
    originalPrice: 1400,
    discount: 39,
    rating: 4.5,
    reviewsCount: 110,
    stock: 40,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    sku: 'HM-SUN-UV400',
    description: '১০০% ইউভি প্রটেকশন পোলারাইজড লেন্স। মেটাল প্রিমিয়াম ফ্রেম, চোখকে সুরক্ষায় অতুলনীয়।',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80'],
    sizes: ['Standard'],
    colors: [
      { name: 'Black', hex: '#000000', label: 'ব্ল্যাক' },
      { name: 'Gold', hex: '#FFD700', label: 'গোল্ডেন' }
    ]
  }
];

// Context Setup
const ShopContext = createContext<any>(null);

export default function App() {
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  // Application State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('hasib_mart_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [categories] = useState(INITIAL_CATEGORIES);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('hasib_mart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('hasib_mart_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Navigation & Router State
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI Drawers & Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Orders & Config
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('hmb_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'NVX-98234',
        date: '2026-10-25',
        customerName: 'আব্দুল হাসিব',
        phone: '01700000000',
        address: 'মিরপুর ১০, ঢাকা',
        deliveryZone: 'inside_dhaka',
        items: [{ name: 'প্রিমিয়াম মেটালিক স্মার্টওয়াচ', qty: 1, price: 3250, size: 'Free Size', color: 'ব্ল্যাক' }],
        subtotal: 3250,
        shippingFee: 60,
        total: 3310,
        paymentMethod: 'cod',
        status: 'shipped'
      }
    ];
  });

  const [whatsappNumber, setWhatsappNumber] = useState('8801700000000');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('hasib_mart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hasib_mart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('hasib_mart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('hmb_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Actions
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const cartItemId = `${product.id}-${selectedSize || 'default'}-${selectedColor?.name || 'default'}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            selectedSize: selectedSize || (product.sizes ? product.sizes[0] : null),
            selectedColor: selectedColor || (product.colors ? product.colors[0] : null),
            quantity
          }
        ];
      }
    });
    showToast('কার্টে পণ্য যোগ করা হয়েছে!');
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('কার্ট থেকে পণ্য সরানো হয়েছে');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('উইশলিস্ট থেকে সরানো হয়েছে');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('উইশলিস্টে যোগ করা হয়েছে!');
        return [...prev, product];
      }
    });
  };

  const navigateTo = (path: string, params: { category?: string; productId?: string } = {}) => {
    setCurrentPath(path);
    if (params.category) setSelectedCategorySlug(params.category);
    if (params.productId) setSelectedProductId(params.productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contextValue = {
    products, setProducts,
    categories,
    cart, setCart, addToCart, removeFromCart, updateCartQuantity,
    wishlist, toggleWishlist,
    currentPath, navigateTo,
    selectedCategorySlug, setSelectedCategorySlug,
    selectedProductId, setSelectedProductId,
    searchQuery, setSearchQuery,
    isCartOpen, setIsCartOpen,
    quickViewProduct, setQuickViewProduct,
    orders, setOrders,
    whatsappNumber, setWhatsappNumber,
    showToast
  };

  return (
    <ShopContext.Provider value={contextValue}>
      <div className="min-h-screen bg-[#F5F3EE] text-[#171717] flex flex-col selection:bg-[#C6A15B] selection:text-[#0B0B0B]">
        
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#C6A15B] text-[#0B0B0B] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-[#0B0B0B]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Announcement Header */}
        <TopAnnouncementBar />

        {/* Main Brand Header */}
        <MainHeader />

        {/* Navigation Bar */}
        <NavigationBar />

        {/* Main View Router Content */}
        <main className="flex-1">
          {currentPath === '/' && <HomePage />}
          {currentPath === '/shop' && <ShopPage />}
          {currentPath === '/category' && <ShopPage />}
          {currentPath === '/product' && <ProductDetailPage />}
          {currentPath === '/cart' && <CartPage />}
          {currentPath === '/checkout' && <CheckoutPage />}
          {currentPath === '/order-success' && <OrderSuccessPage />}
          {currentPath === '/track-order' && <TrackOrderPage />}
          {currentPath === '/wishlist' && <WishlistPage />}
          {currentPath === '/admin' && <AdminDashboardPage />}
          {currentPath === '/login' && <LoginPage />}
          {currentPath === '/shipping-policy' && <PolicyPage title="ডেলিভারি পলিসি" />}
          {currentPath === '/return-policy' && <PolicyPage title="রিটার্ন ও রিফান্ড পলিসি" />}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Shopping Cart Drawer */}
        <CartDrawer />

        {/* Floating Quick View Modal */}
        {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}

        {/* Mobile Navigation Bottom Bar */}
        <MobileBottomNav />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsAppButton />
      </div>
    </ShopContext.Provider>
  );
}

// Custom Hook to consume Context safely
const useShop = () => useContext(ShopContext);

// ==========================================
// 3. HEADER & ANNOUNCEMENT COMPONENTS
// ==========================================
function TopAnnouncementBar() {
  return (
    <div className="bg-[#0A1115] border-b border-[#E2DCCF] py-2 px-4 text-xs text-[#55514A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="flex items-center gap-1.5 text-[#C6A15B]">
            <Truck className="w-3.5 h-3.5" /> সারা বাংলাদেশে ডেলিভারি
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" /> ১০০% অরিজিনাল পণ্য
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#C6A15B]" /> সহজ রিটার্ন সুবিধা
          </span>
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-[#C6A15B]" /> ২৪/৭ কাস্টমার সাপোর্ট
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <span>হটলাইন: <strong className="text-[#C6A15B]">+880 1700-000000</strong></span>
          <span className="text-[#E2DCCF]">|</span>
          <button onClick={() => window.location.href='/track-order'} className="hover:text-[#C6A15B] transition-colors">
            অর্ডার ট্র্যাক করুন
          </button>
        </div>
      </div>
    </div>
  );
}

function MainHeader() {
  const { cart, wishlist, navigateTo, searchQuery, setSearchQuery, products, setIsCartOpen } = useShop();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [searchQuery, products]);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#E2DCCF]/80 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D8BC7A] to-[#A88643] flex items-center justify-center shadow-lg shadow-[#C6A15B]/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-6 h-6 text-[#0B0B0B] stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight gold-gradient-text leading-none">
              HASIB MART
            </h1>
            <p className="text-[10px] md:text-xs text-[#55514A] font-medium tracking-wide">
              আপনার বিশ্বস্ত অনলাইন শপিং গন্তব্য
            </p>
          </div>
        </div>

        {/* Center Dynamic Search Bar */}
        <div className="hidden md:block flex-1 max-w-xl relative">
          <div className="relative">
            <input
              type="text"
              placeholder="আপনি কী খুঁজছেন? (যেমন: শার্ট, স্মার্টওয়াচ, জুতা...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-[#FFFFFF] text-[#F8FAFC] placeholder-[#777168] border border-[#E2DCCF] rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors"
            />
            <button 
              onClick={() => {
                if (searchQuery) navigateTo('/shop');
              }}
              className="absolute right-1 top-1 bottom-1 px-4 bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] font-semibold rounded-full flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Search Dropdown Modal */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl shadow-2xl overflow-hidden z-50">
              {searchResults.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    navigateTo('/product', { productId: prod.id });
                    setShowSearchDropdown(false);
                  }}
                  className="p-3 border-b border-[#E2DCCF]/50 hover:bg-[#EEEAE1] flex items-center gap-3 cursor-pointer transition-colors"
                >
                  <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#F8FAFC] truncate">{prod.name}</p>
                    <p className="text-xs text-[#C6A15B] font-bold">৳{prod.price.toLocaleString('bn-BD')}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#777168]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* Wishlist Button */}
          <button 
            onClick={() => navigateTo('/wishlist')}
            className="p-2.5 rounded-full hover:bg-[#EEEAE1] text-[#55514A] hover:text-[#C6A15B] relative transition-colors"
            title="উইশলিস্ট"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF3038] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Admin / Account Quick Nav */}
          <button 
            onClick={() => navigateTo('/admin')}
            className="p-2.5 rounded-full hover:bg-[#EEEAE1] text-[#55514A] hover:text-[#C6A15B] transition-colors"
            title="এডমিন ড্যাশবোর্ড"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Header Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#FFFFFF] hover:bg-[#EEEAE1] border border-[#E2DCCF] hover:border-[#C6A15B] p-2 md:px-4 md:py-2 rounded-full flex items-center gap-3 transition-all"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#C6A15B]" />
              <span className="absolute -top-2 -right-2 bg-[#EF3038] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] text-[#777168] leading-none">আপনার কার্ট</p>
              <p className="text-xs font-bold text-[#C6A15B] leading-tight">৳{cartSubtotal.toLocaleString('bn-BD')}</p>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}

function NavigationBar() {
  const { categories, navigateTo, currentPath, selectedCategorySlug } = useShop();

  return (
    <nav className="bg-[#0A1115] border-b border-[#E2DCCF] hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <ul className="flex items-center gap-1 font-medium text-sm">
          <li>
            <button
              onClick={() => navigateTo('/')}
              className={`px-4 py-3 rounded-none border-b-2 transition-all ${
                currentPath === '/' ? 'border-[#C6A15B] text-[#C6A15B] font-bold' : 'border-transparent text-[#55514A] hover:text-[#C6A15B]'
              }`}
            >
              হোম
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('/shop', { category: 'all' })}
              className={`px-4 py-3 border-b-2 transition-all ${
                currentPath === '/shop' && selectedCategorySlug === 'all'
                  ? 'border-[#C6A15B] text-[#C6A15B] font-bold'
                  : 'border-transparent text-[#55514A] hover:text-[#C6A15B]'
              }`}
            >
              সব পণ্য
            </button>
          </li>
          {categories.slice(0, 7).map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => navigateTo('/shop', { category: cat.slug })}
                className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  selectedCategorySlug === cat.slug && currentPath === '/shop'
                    ? 'border-[#C6A15B] text-[#C6A15B] font-bold'
                    : 'border-transparent text-[#55514A] hover:text-[#C6A15B]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Offer Tag Badge */}
        <button
          onClick={() => navigateTo('/shop')}
          className="bg-[#EEEAE1] text-[#C6A15B] border border-[#C6A15B]/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-[#C6A15B] hover:text-[#0B0B0B] transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>বিশেষ অফার</span>
        </button>
      </div>
    </nav>
  );
}

// ==========================================
// 4. HOMEPAGE COMPONENTS
// ==========================================
function HomePage() {
  const { products, categories, navigateTo } = useShop();

  const popularProducts = products.filter((p) => p.isPopular);
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Slider Banner */}
      <HeroBanner />

      {/* 2. Trust Service Highlights */}
      <TrustHighlightsBar />

      {/* 3. Shop by Category Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-extrabold gold-gradient-text">ক্যাটাগরি সমূহ</h2>
            <p className="text-xs text-[#777168]">আপনার পছন্দের পণ্য খুঁজে নিন সহজেই</p>
          </div>
          <button 
            onClick={() => navigateTo('/shop')}
            className="text-xs font-semibold text-[#C6A15B] hover:underline flex items-center gap-1"
          >
            সব দেখুন <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('/shop', { category: cat.slug })}
              className="bg-[#FFFFFF] hover:bg-[#EEEAE1] border border-[#E2DCCF] hover:border-[#C6A15B] p-3 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer group transition-all transform hover:-translate-y-1 shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-[#EEEAE1] group-hover:bg-[#C6A15B]/10 flex items-center justify-center text-2xl mb-2 transition-colors">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-[#171717] group-hover:text-[#C6A15B] transition-colors">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#777168]">{cat.count} টি পণ্য</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Popular Products Section */}
      <ProductGridSection
        title="জনপ্রিয় পণ্য সমূহ"
        subtitle="গ্রাহকদের সবচেয়ে পছন্দের কালেকশন"
        products={popularProducts}
      />

      {/* 5. Promotional Black-and-Gold Banner */}
      <PromotionalBanner />

      {/* 6. New Arrivals Section */}
      <ProductGridSection
        title="নতুন এসেছে"
        subtitle="লেটেস্ট নতুন ডিজাইনের গ্যাজেট ও ফ্যাশন"
        products={newArrivals}
      />

      {/* 7. Best Sellers Grid */}
      <ProductGridSection
        title="সেরা বিক্রিত পণ্য"
        subtitle="সবচেয়ে বেশি অর্ডার করা টপ সেলিং আইটেম"
        products={bestSellers}
      />
    </div>
  );
}

function HeroBanner() {
  const { navigateTo } = useShop();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'আপনার পছন্দের সব পণ্য, এখন এক জায়গায়!',
      sub: 'Fashion | Gadget | Home & Kitchen | Beauty | Accessories',
      btnText: 'এখনই কেনাকাটা করুন',
      bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
      badge: 'প্রিমিয়াম কালেকশন ২০২৬'
    },
    {
      title: 'স্মার্ট লাইফস্টাইল ও লেটেস্ট গ্যাজেটস',
      sub: 'স্মার্টওয়াচ, ইয়ারবাডস এবং মোবাইল এক্সেসরিজে সর্বোচ্চ ৩৫% ছাড়!',
      btnText: 'অফার দেখুন',
      bgImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
      badge: 'বিশেষ অফার'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];

  return (
    <div className="relative max-w-7xl mx-auto px-4 pt-4">
      <div className="relative min-h-[380px] md:min-h-[460px] rounded-3xl overflow-hidden border border-[#E2DCCF] flex items-center bg-[#0A1115]">
        
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-30"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />

        {/* Hero Banner Content Overlay */}
        <div className="relative z-10 max-w-2xl px-6 md:px-12 py-8 space-y-4">
          <span className="inline-block bg-[#C6A15B]/10 text-[#C6A15B] border border-[#C6A15B]/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider">
            {slide.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F8FAFC] leading-tight">
            {slide.title}
          </h2>
          <p className="text-sm md:text-base text-[#55514A]">
            {slide.sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('/shop')}
              className="bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] font-bold px-7 py-3 rounded-xl shadow-lg shadow-[#C6A15B]/20 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span>{slide.btnText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('/track-order')}
              className="bg-[#EEEAE1] hover:bg-[#E2DCCF] text-[#F8FAFC] border border-[#E2DCCF] font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              অর্ডার ট্র্যাক করুন
            </button>
          </div>
        </div>

        {/* Slider Indicator Dots */}
        <div className="absolute bottom-4 right-6 z-10 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === idx ? 'bg-[#C6A15B] w-8' : 'bg-[#E2DCCF]'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function TrustHighlightsBar() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/10 text-[#C6A15B] flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#171717]">দ্রুত ডেলিভারি</h4>
            <p className="text-[10px] text-[#777168]">সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/10 text-[#C6A15B] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#171717]">অরিজিনাল পণ্য</h4>
            <p className="text-[10px] text-[#777168]">১০০% জেনুইন কোয়ালিটি গ্যারান্টি</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/10 text-[#C6A15B] flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#171717]">সহজ রিটার্ন</h4>
            <p className="text-[10px] text-[#777168]">৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/10 text-[#C6A15B] flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#171717]">কাস্টমার সাপোর্ট</h4>
            <p className="text-[10px] text-[#777168]">সারাদিন সার্বক্ষণিক সেবায় প্রস্তুত</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductGridSection({ title, subtitle, products }) {
  const { navigateTo } = useShop();

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-extrabold gold-gradient-text">{title}</h2>
          <p className="text-xs text-[#777168]">{subtitle}</p>
        </div>
        <button
          onClick={() => navigateTo('/shop')}
          className="text-xs font-semibold text-[#C6A15B] hover:underline flex items-center gap-1"
        >
          সব দেখুন <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function PromotionalBanner() {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-gradient-to-r from-[#FFFFFF] via-[#EEEAE1] to-[#FFFFFF] border border-[#C6A15B]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="bg-[#EF3038] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
            সীমিত সময়ের জন্য
          </span>
          <h3 className="text-2xl md:text-4xl font-extrabold text-[#171717]">
            সেরা দামে পছন্দসই প্রিমিয়াম কালেকশন!
          </h3>
          <p className="text-xs md:text-sm text-[#55514A]">
            আজই অর্ডার করুন, পছন্দের পণ্য পৌঁছে যাবে আপনার ঠিকানায়। দ্রুত ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা।
          </p>
        </div>
        <button
          onClick={() => navigateTo('/shop')}
          className="bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] font-bold px-8 py-3.5 rounded-xl shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 whitespace-nowrap"
        >
          <span>অফার প্রোডাক্ট দেখুন</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 5. PRODUCT CARD COMPONENT
// ==========================================
function ProductCard({ product }) {
  const { navigateTo, addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useShop();
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  return (
    <div className="bg-[#FFFFFF] border border-[#E2DCCF] hover:border-[#C6A15B] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-[#C6A15B]/5 relative">
      
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-[#EF3038] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
          -{product.discount}%
        </span>
      )}

      {/* Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isWishlisted ? 'bg-[#EF3038] text-white' : 'bg-[#0B0B0B]/60 text-white hover:bg-[#C6A15B] hover:text-[#0B0B0B]'
        }`}
      >
        <Heart className="w-4 h-4 fill-current" />
      </button>

      {/* Product Image Container */}
      <div 
        onClick={() => navigateTo('/product', { productId: product.id })}
        className="relative pt-[100%] bg-[#EEEAE1] cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Quick View Hover Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-2 left-2 right-2 bg-[#0B0B0B]/80 backdrop-blur-sm text-xs font-semibold py-2 rounded-xl text-[#171717] hover:bg-[#C6A15B] hover:text-[#0B0B0B] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>দ্রুত দেখুন</span>
        </button>
      </div>

      {/* Product Details Area */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 text-[#C6A15B] fill-current" />
            <span className="text-[11px] font-bold text-[#171717]">{product.rating}</span>
            <span className="text-[10px] text-[#777168]">({product.reviewsCount})</span>
          </div>

          <h3 
            onClick={() => navigateTo('/product', { productId: product.id })}
            className="text-xs md:text-sm font-semibold text-[#171717] line-clamp-2 hover:text-[#C6A15B] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Size/Color Indicator Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-1 overflow-x-auto text-[9px] text-[#55514A]">
            <span>সাইজ:</span>
            <span className="font-bold text-[#C6A15B]">{product.sizes.join(', ')}</span>
          </div>
        )}

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-[#E2DCCF]/50 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm md:text-base font-extrabold text-[#C6A15B]">
              ৳{product.price.toLocaleString('bn-BD')}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] text-[#777168] line-through">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0], 1)}
            className="bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] p-2 rounded-xl font-bold transition-all flex items-center justify-center shadow-md active:scale-95"
            title="কার্টে যোগ করুন"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 6. SHOP CATALOG PAGE
// ==========================================
function ShopPage() {
  const { products, categories, selectedCategorySlug, setSelectedCategorySlug } = useShop();

  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategorySlug === 'all' || p.category === selectedCategorySlug;
      const matchPrice = p.price <= priceRange;
      return matchCat && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [products, selectedCategorySlug, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-[#777168]">
        <span>হোম</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#C6A15B] font-semibold">শপ / ক্যাটাগরি তালিকা</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Filter Sidebar */}
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-5 space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-[#E2DCCF] pb-3">
            <h3 className="font-bold text-sm flex items-center gap-2 text-[#C6A15B]">
              <Filter className="w-4 h-4" /> ফিল্টার করুন
            </h3>
            <button 
              onClick={() => { setSelectedCategorySlug('all'); setPriceRange(10000); }}
              className="text-xs text-[#777168] hover:text-[#C6A15B]"
            >
              রিসেট
            </button>
          </div>

          {/* Category Selector */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] mb-3">ক্যাটাগরি</h4>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategorySlug('all')}
                className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-all ${
                  selectedCategorySlug === 'all' ? 'bg-[#C6A15B] text-[#0B0B0B] font-bold' : 'text-[#55514A] hover:bg-[#EEEAE1]'
                }`}
              >
                সব ক্যাটাগরি ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-all flex justify-between items-center ${
                    selectedCategorySlug === cat.slug ? 'bg-[#C6A15B] text-[#0B0B0B] font-bold' : 'text-[#55514A] hover:bg-[#EEEAE1]'
                  }`}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className="text-[10px] opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-bold text-[#171717]">সর্বোচ্চ দাম:</span>
              <span className="text-[#C6A15B] font-bold">৳{priceRange}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C6A15B] cursor-pointer"
            />
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Top Sort Header */}
          <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
            <p className="text-xs text-[#55514A]">
              মোট <strong className="text-[#C6A15B]">{filteredProducts.length}</strong> টি পণ্য পাওয়া গেছে
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#777168]">সাজান:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#EEEAE1] text-[#171717] border border-[#E2DCCF] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="popular">জনপ্রিয়তা অনুযায়ী</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
              </select>
            </div>
          </div>

          {/* Products List */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-12 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-[#C6A15B] mx-auto" />
              <h3 className="text-base font-bold">কোন পণ্য পাওয়া যায়নি</h3>
              <p className="text-xs text-[#777168]">আপনার নির্বাচন করা ফিল্টারে কোন পণ্য পাওয়া যায়নি।</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// ==========================================
// 7. PRODUCT DETAIL PAGE (WITH VARIANTS)
// ==========================================
function ProductDetailPage() {
  const { products, selectedProductId, addToCart, navigateTo, whatsappNumber } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSize(product.sizes ? product.sizes[0] : null);
    setSelectedColor(product.colors ? product.colors[0] : null);
  }, [product]);

  const imagesList = product.images || [product.image];

  // WhatsApp Order Text Generator
  const generateWhatsAppMessage = () => {
    const text = `হ্যালো Hasib Mart! আমি এই পণ্যটি অর্ডার করতে চাই:
📦 পণ্য: ${product.name}
🔢 সাইজ: ${selectedSize || 'N/A'}
🎨 কালার: ${selectedColor?.label || 'N/A'}
💰 মূল্য: ৳${product.price}
📊 পরিমাণ: ${quantity}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#777168]">
        <button onClick={() => navigateTo('/')} className="hover:text-[#C6A15B]">হোম</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/shop')} className="hover:text-[#C6A15B]">পণ্য</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#C6A15B] font-semibold truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-3xl p-4 overflow-hidden relative">
            <img src={selectedImage} alt={product.name} className="w-full h-80 md:h-[420px] object-cover rounded-2xl" />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImage === img ? 'border-[#C6A15B]' : 'border-[#E2DCCF] opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details & Variant Selectors */}
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-3xl p-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#C6A15B] bg-[#C6A15B]/10 border border-[#C6A15B]/30 px-3 py-1 rounded-full">
              {product.categoryName}
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#171717] mt-3">{product.name}</h1>
            <p className="text-xs text-[#777168] mt-1">SKU: {product.sku}</p>
          </div>

          {/* Pricing Banner */}
          <div className="bg-[#EEEAE1] p-4 rounded-2xl flex items-center gap-4">
            <span className="text-2xl md:text-3xl font-extrabold text-[#C6A15B]">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#777168] line-through">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-[#EF3038] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                {product.discount}% ছাড়
              </span>
            )}
          </div>

          {/* 1. Size Selection Swatches */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#171717] flex justify-between">
                <span>সাইজ সিলেক্ট করুন:</span>
                <span className="text-[#C6A15B]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#C6A15B] text-[#0B0B0B] border-[#C6A15B]'
                        : 'bg-[#EEEAE1] text-[#55514A] border-[#E2DCCF] hover:border-[#C6A15B]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Color Selection Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#171717] flex justify-between">
                <span>কালার সিলেক্ট করুন:</span>
                <span className="text-[#C6A15B]">{selectedColor?.label}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((clr) => (
                  <button
                    key={clr.name}
                    onClick={() => setSelectedColor(clr)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      selectedColor?.name === clr.name
                        ? 'border-[#C6A15B] bg-[#EEEAE1] ring-1 ring-[#C6A15B]'
                        : 'border-[#E2DCCF] bg-[#EEEAE1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: clr.hex }} />
                    <span>{clr.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#171717]">পরিমাণ:</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#171717] hover:text-[#C6A15B]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#C6A15B]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#171717] hover:text-[#C6A15B]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-[#777168]">স্টক উপলব্ধ: {product.stock} টি</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                addToCart(product, selectedSize, selectedColor, quantity);
                navigateTo('/checkout');
              }}
              className="w-full bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] font-extrabold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <span>এখনই কিনুন (Buy Now)</span>
            </button>

            <button
              onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              className="w-full bg-[#EEEAE1] hover:bg-[#E2DCCF] text-[#171717] border border-[#E2DCCF] font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-[#C6A15B]" />
              <span>কার্টে যোগ করুন</span>
            </button>

            {/* Direct WhatsApp Ordering */}
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp এ অর্ডার করুন</span>
            </a>
          </div>

          {/* Description */}
          <div className="border-t border-[#E2DCCF] pt-4 space-y-2">
            <h4 className="text-xs font-bold text-[#171717]">পণ্যের বিবরণ:</h4>
            <p className="text-xs text-[#55514A] leading-relaxed">{product.description}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

// ==========================================
// 8. QUICK VIEW MODAL
// ==========================================
function QuickViewModal({ product, onClose }) {
  const { addToCart, navigateTo } = useShop();

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#E2DCCF] w-full max-w-2xl rounded-3xl p-6 relative space-y-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#EEEAE1] text-[#55514A] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-2xl" />
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#171717]">{product.name}</h3>
            <div className="text-xl font-extrabold text-[#C6A15B]">৳{product.price}</div>
            
            {product.sizes && (
              <div className="space-y-1">
                <span className="text-xs text-[#777168]">সাইজ:</span>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs rounded-lg border ${selectedSize === s ? 'bg-[#C6A15B] text-black font-bold' : 'border-[#E2DCCF]'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, 1);
                  onClose();
                }}
                className="flex-1 bg-[#C6A15B] text-[#0B0B0B] font-bold py-2.5 rounded-xl text-xs"
              >
                কার্টে যোগ করুন
              </button>
              <button
                onClick={() => {
                  navigateTo('/product', { productId: product.id });
                  onClose();
                }}
                className="px-4 bg-[#EEEAE1] border border-[#E2DCCF] text-xs font-semibold rounded-xl"
              >
                বিস্তারিত
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. CART DRAWER & CART PAGE
// ==========================================
function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateCartQuantity, navigateTo } = useShop();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="bg-[#FFFFFF] border-l border-[#E2DCCF] w-full max-w-md h-full flex flex-col justify-between p-6">
        
        {/* Cart Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E2DCCF] pb-4">
          <h3 className="font-extrabold text-base flex items-center gap-2 gold-gradient-text">
            <ShoppingCart className="w-5 h-5 text-[#C6A15B]" />
            <span>আপনার শপিং কার্ট</span>
          </h3>
          <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#55514A] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#E2DCCF] mx-auto" />
              <p className="text-sm text-[#777168]">আপনার কার্ট বর্তমানে খালি</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="bg-[#EEEAE1] p-3 rounded-2xl flex items-center gap-3 border border-[#E2DCCF]">
                <img src={item.product.image} alt="" className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-[#171717] truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-[#777168]">
                    {item.selectedSize && `সাইজ: ${item.selectedSize}`} {item.selectedColor && `| কালার: ${item.selectedColor.label}`}
                  </p>
                  <p className="text-xs font-bold text-[#C6A15B]">৳{item.product.price}</p>
                </div>

                <div className="flex items-center gap-1 bg-[#FFFFFF] rounded-lg p-1 border border-[#E2DCCF]">
                  <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)} className="p-1">
                    <Minus className="w-3 h-3 text-[#55514A]" />
                  </button>
                  <span className="text-xs font-bold px-1 text-[#C6A15B]">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)} className="p-1">
                    <Plus className="w-3 h-3 text-[#55514A]" />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.cartItemId)} className="p-1 text-[#EF3038]">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-[#E2DCCF] pt-4 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#55514A]">মোট হিসাব (Subtotal):</span>
              <span className="font-extrabold text-[#C6A15B] text-base">৳{subtotal.toLocaleString('bn-BD')}</span>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('/checkout');
                }}
                className="w-full bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] font-extrabold py-3 rounded-xl shadow-lg transition-all"
              >
                চেকআউট করুন
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('/cart');
                }}
                className="w-full bg-[#EEEAE1] border border-[#E2DCCF] text-[#171717] font-semibold py-2.5 rounded-xl text-xs"
              >
                কার্ট দেখুন
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, navigateTo } = useShop();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-extrabold gold-gradient-text">শপিং কার্ট</h2>

      {cart.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-12 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#E2DCCF] mx-auto" />
          <p className="text-sm text-[#777168]">আপনার কার্টে কোন পণ্য যোগ করা হয়নি</p>
          <button onClick={() => navigateTo('/shop')} className="bg-[#C6A15B] text-[#0B0B0B] font-bold px-6 py-2.5 rounded-xl text-xs">
            শপিং শুরু করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.cartItemId} className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-4 flex items-center gap-4">
                <img src={item.product.image} alt="" className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-bold text-[#171717]">{item.product.name}</h4>
                  <p className="text-xs text-[#777168]">
                    {item.selectedSize && `সাইজ: ${item.selectedSize}`} {item.selectedColor && `| কালার: ${item.selectedColor.label}`}
                  </p>
                  <p className="text-sm font-bold text-[#C6A15B]">৳{item.product.price}</p>
                </div>

                <div className="flex items-center gap-2 bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-1">
                  <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)} className="px-2">
                    -
                  </button>
                  <span className="text-xs font-bold text-[#C6A15B]">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)} className="px-2">
                    +
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.cartItemId)} className="text-[#EF3038]">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-6 space-y-4 h-fit">
            <h3 className="font-bold text-sm border-b border-[#E2DCCF] pb-3">অর্ডার সামারি</h3>
            <div className="flex justify-between text-xs text-[#55514A]">
              <span>পণ্যমূল্য:</span>
              <span>৳{subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between text-xs text-[#55514A]">
              <span>ডেলিভারি চার্জ:</span>
              <span className="text-xs text-[#777168]">চেকআউটে হিসাব করা হবে</span>
            </div>
            <div className="border-t border-[#E2DCCF] pt-3 flex justify-between font-extrabold text-sm text-[#C6A15B]">
              <span>মোট:</span>
              <span>৳{subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <button
              onClick={() => navigateTo('/checkout')}
              className="w-full bg-[#C6A15B] text-[#0B0B0B] font-extrabold py-3 rounded-xl"
            >
              চেকআউট করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10. CHECKOUT & ORDER SUCCESS
// ==========================================
function CheckoutPage() {
  const { cart, setCart, navigateTo, setOrders } = useShop();

  const [deliveryZone, setDeliveryZone] = useState('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const deliveryFee = deliveryZone === 'inside_dhaka' ? 60 : 120;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalAmount = subtotal + deliveryFee;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('অনুগ্রহ করে সঠিক তথ্যগুলো পূরণ করুন');
      return;
    }

    const newOrder = {
      id: `NVX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      deliveryZone,
      items: cart.map((c) => ({
        name: c.product.name,
        qty: c.quantity,
        price: c.product.price,
        size: c.selectedSize,
        color: c.selectedColor?.label
      })),
      subtotal,
      shippingFee: deliveryFee,
      total: totalAmount,
      paymentMethod,
      status: 'pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    navigateTo('/order-success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-extrabold gold-gradient-text">অর্ডার তথ্য ও চেকআউট</h2>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Address & Customer Info Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#C6A15B] flex items-center gap-2 border-b border-[#E2DCCF] pb-3">
              <MapPin className="w-4 h-4" /> আপনার ডেলিভারি ঠিকানা
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#55514A] mb-1 block">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="পূর্ণ নাম লিখুন"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#EEEAE1] text-[#171717] border border-[#E2DCCF] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#55514A] mb-1 block">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="১১ ডিজিটের নম্বর"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#EEEAE1] text-[#171717] border border-[#E2DCCF] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#55514A] mb-1 block">সম্পূর্ণ ঠিকানা *</label>
              <textarea
                required
                rows={3}
                placeholder="বাসা নম্বর, রোড নম্বর, এলাকা, থানা ও জেলা লিখুন..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#EEEAE1] text-[#171717] border border-[#E2DCCF] rounded-xl p-3 text-xs focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>

          {/* Delivery Zone Selector */}
          <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#C6A15B] flex items-center gap-2 border-b border-[#E2DCCF] pb-3">
              <Truck className="w-4 h-4" /> ডেলিভারি এলাকা নির্বাচন করুন
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setDeliveryZone('inside_dhaka')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryZone === 'inside_dhaka' ? 'border-[#C6A15B] bg-[#EEEAE1]' : 'border-[#E2DCCF]'
                }`}
              >
                <div className="flex justify-between items-center font-bold text-xs">
                  <span>ঢাকার ভেতরে</span>
                  <span className="text-[#C6A15B]">৳৬০</span>
                </div>
                <p className="text-[10px] text-[#777168] mt-1">১-২ কার্যদিবসের মধ্যে ডেলিভারি</p>
              </div>

              <div
                onClick={() => setDeliveryZone('outside_dhaka')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryZone === 'outside_dhaka' ? 'border-[#C6A15B] bg-[#EEEAE1]' : 'border-[#E2DCCF]'
                }`}
              >
                <div className="flex justify-between items-center font-bold text-xs">
                  <span>ঢাকার বাইরে</span>
                  <span className="text-[#C6A15B]">৳১২০</span>
                </div>
                <p className="text-[10px] text-[#777168] mt-1">২-৪ কার্যদিবসের মধ্যে ডেলিভারি</p>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#C6A15B] flex items-center gap-2 border-b border-[#E2DCCF] pb-3">
              <CreditCard className="w-4 h-4" /> পেমেন্ট পদ্ধতি
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-[#C6A15B]"
                />
                <span className="text-xs font-bold">ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা দিন)</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl cursor-pointer opacity-80">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="accent-[#C6A15B]"
                />
                <span className="text-xs font-bold">বিকাশ / নগদ (bKash / Nagad Mobile Banking)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Area */}
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-6 space-y-4 h-fit">
          <h3 className="font-bold text-sm border-b border-[#E2DCCF] pb-3">অর্ডার সামারি</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex justify-between text-xs">
                <span className="text-[#55514A] truncate max-w-[160px]">{item.product.name} x {item.quantity}</span>
                <span className="font-bold text-[#C6A15B]">৳{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E2DCCF] pt-3 space-y-2 text-xs text-[#55514A]">
            <div className="flex justify-between">
              <span>সাবটোটাল:</span>
              <span>৳{subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ:</span>
              <span>৳{deliveryFee}</span>
            </div>
            <div className="border-t border-[#E2DCCF] pt-2 flex justify-between font-extrabold text-base text-[#C6A15B]">
              <span>সর্বমোট:</span>
              <span>৳{totalAmount.toLocaleString('bn-BD')}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C6A15B] hover:bg-[#A88643] text-[#0B0B0B] font-extrabold py-3.5 rounded-xl shadow-xl transition-all"
          >
            অর্ডার কনফার্ম করুন
          </button>
        </div>

      </form>
    </div>
  );
}

function OrderSuccessPage() {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-[#171717]">আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h2>
        <p className="text-xs text-[#55514A]">
          আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে কল করে অর্ডারটি নিশ্চিত করবেন।
        </p>
      </div>

      <div className="pt-4 flex justify-center gap-4">
        <button
          onClick={() => navigateTo('/')}
          className="bg-[#C6A15B] text-[#0B0B0B] font-bold px-6 py-3 rounded-xl text-xs"
        >
          হোমপেজে ফিরে যান
        </button>
        <button
          onClick={() => navigateTo('/track-order')}
          className="bg-[#EEEAE1] border border-[#E2DCCF] text-white font-semibold px-6 py-3 rounded-xl text-xs"
        >
          অর্ডার ট্র্যাক করুন
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 11. ORDER TRACKING PAGE
// ==========================================
function TrackOrderPage() {
  const { orders } = useShop();
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setSearched(true);
    const match = orders.find((o) => o.id.toLowerCase() === searchId.trim().toLowerCase());
    setFoundOrder(match || null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold gold-gradient-text">অর্ডার ট্র্যাক করুন</h2>
        <p className="text-xs text-[#777168]">আপনার অর্ডার আইডি দিয়ে বর্তমান ডেলিভারি স্ট্যাটাস চেক করুন</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          placeholder="যেমন: NVX-98234"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-1 bg-[#FFFFFF] border border-[#E2DCCF] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C6A15B]"
        />
        <button type="submit" className="bg-[#C6A15B] text-[#0B0B0B] font-bold px-6 py-3 rounded-xl text-xs">
          খুঁজুন
        </button>
      </form>

      {searched && foundOrder && (
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[#E2DCCF] pb-4">
            <div>
              <h4 className="font-extrabold text-sm text-[#C6A15B]">অর্ডার নম্বর: {foundOrder.id}</h4>
              <p className="text-[10px] text-[#777168]">তারিখ: {foundOrder.date}</p>
            </div>
            <span className="bg-[#C6A15B]/20 text-[#C6A15B] text-xs font-bold px-3 py-1 rounded-full uppercase">
              {foundOrder.status}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[#55514A]">গ্রাহক: {foundOrder.customerName}</p>
            <p className="text-xs text-[#55514A]">ঠিকানা: {foundOrder.address}</p>
            <p className="text-xs font-bold text-[#C6A15B]">মোট মূল্য: ৳{foundOrder.total}</p>
          </div>
        </div>
      )}

      {searched && !foundOrder && (
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-8 text-center text-xs text-[#777168]">
          এই আইডির সাথে মিল রেখে কোন অর্ডার পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
}

// ==========================================
// 12. WISHLIST PAGE
// ==========================================
function WishlistPage() {
  const { wishlist, navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-extrabold gold-gradient-text">আমার উইশলিস্ট ({wishlist.length})</h2>

      {wishlist.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl p-12 text-center space-y-3">
          <Heart className="w-10 h-10 text-[#E2DCCF] mx-auto" />
          <p className="text-xs text-[#777168]">উইশলিস্টে কোন পছন্দসই পণ্য যুক্ত নেই</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 13. ADMIN DASHBOARD PAGE
// ==========================================
function AdminDashboardPage() {
  const { products, setProducts, orders, setOrders, categories } = useShop();

  const [activeTab, setActiveTab] = useState('products');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'fashion',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const created = {
      id: `p-${Date.now()}`,
      name: newProd.name,
      category: newProd.category,
      categoryName: categories.find((c) => c.slug === newProd.category)?.name || 'General',
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice),
      discount: Math.round(((Number(newProd.originalPrice) - Number(newProd.price)) / Number(newProd.originalPrice)) * 100) || 0,
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(newProd.stock),
      sku: newProd.sku || 'HM-GEN',
      description: newProd.description,
      image: newProd.image,
      sizes: ['Standard'],
      colors: [{ name: 'Default', hex: '#000000', label: 'ডিফল্ট' }]
    };

    setProducts([created, ...products]);
    setShowAddModal(false);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Dashboard Top Header */}
      <div className="flex justify-between items-center bg-[#FFFFFF] border border-[#E2DCCF] p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-extrabold gold-gradient-text flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-[#C6A15B]" /> এডমিন কন্ট্রোল প্যানেল
          </h2>
          <p className="text-xs text-[#777168]">স্টোরের পণ্য, স্টক ও অর্ডার পরিচালনা করুন</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#C6A15B] text-[#0B0B0B] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* Admin Tabs Bar */}
      <div className="flex gap-2 border-b border-[#E2DCCF]">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'products' ? 'border-[#C6A15B] text-[#C6A15B]' : 'border-transparent text-[#777168]'
          }`}
        >
          পণ্য তালিকা ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'orders' ? 'border-[#C6A15B] text-[#C6A15B]' : 'border-transparent text-[#777168]'
          }`}
        >
          অর্ডার সমূহ ({orders.length})
        </button>
      </div>

      {/* Tab Content: Products Table */}
      {activeTab === 'products' && (
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EEEAE1] text-[#55514A] border-b border-[#E2DCCF]">
              <tr>
                <th className="p-3">ছবি</th>
                <th className="p-3">নাম</th>
                <th className="p-3">ক্যাটাগরি</th>
                <th className="p-3">মূল্য</th>
                <th className="p-3">স্টক</th>
                <th className="p-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DCCF]/50">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#EEEAE1]/50">
                  <td className="p-3">
                    <img src={prod.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                  </td>
                  <td className="p-3 font-semibold text-[#171717]">{prod.name}</td>
                  <td className="p-3 text-[#777168]">{prod.categoryName}</td>
                  <td className="p-3 font-bold text-[#C6A15B]">৳{prod.price}</td>
                  <td className="p-3">{prod.stock} টি</td>
                  <td className="p-3">
                    <button
                      onClick={() => setProducts(products.filter((p) => p.id !== prod.id))}
                      className="p-1.5 text-[#EF3038] hover:bg-[#EF3038]/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EEEAE1] text-[#55514A] border-b border-[#E2DCCF]">
              <tr>
                <th className="p-3">আইডি</th>
                <th className="p-3">গ্রাহক</th>
                <th className="p-3">ঠিকানা</th>
                <th className="p-3">সর্বমোট</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3">পরিবর্তন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DCCF]/50">
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td className="p-3 font-bold text-[#C6A15B]">{ord.id}</td>
                  <td className="p-3">{ord.customerName} ({ord.phone})</td>
                  <td className="p-3 text-[#777168]">{ord.address}</td>
                  <td className="p-3 font-bold">৳{ord.total}</td>
                  <td className="p-3">
                    <span className="bg-[#C6A15B]/20 text-[#C6A15B] px-2 py-0.5 rounded text-[10px] font-bold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="bg-[#EEEAE1] text-white border border-[#E2DCCF] rounded p-1 text-[10px]"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddProduct} className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-3xl p-6 w-full max-w-lg space-y-4">
            <h3 className="font-extrabold text-base text-[#C6A15B]">নতুন প্রোডাক্ট অ্যাড করুন</h3>

            <input
              type="text"
              required
              placeholder="পণ্যের নাম"
              value={newProd.name}
              onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
              className="w-full bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-2.5 text-xs"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                required
                placeholder="বিক্রয় মূল্য"
                value={newProd.price}
                onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                className="bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-2.5 text-xs"
              />
              <input
                type="number"
                placeholder="আসল মূল্য"
                value={newProd.originalPrice}
                onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                className="bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-2.5 text-xs"
              />
            </div>

            <input
              type="number"
              required
              placeholder="স্টক পরিমাণ"
              value={newProd.stock}
              onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
              className="w-full bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-2.5 text-xs"
            />

            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 bg-[#C6A15B] text-[#0B0B0B] font-bold py-2.5 rounded-xl text-xs">
                সংরক্ষণ করুন
              </button>
              <button onClick={() => setShowAddModal(false)} type="button" className="px-4 bg-[#EEEAE1] border border-[#E2DCCF] text-xs">
                বাতিল
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

function LoginPage() {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="bg-[#FFFFFF] border border-[#E2DCCF] rounded-3xl p-8 space-y-6 text-center">
        <h2 className="text-xl font-extrabold gold-gradient-text">সাইন ইন / একাউন্ট</h2>
        <input type="text" placeholder="মোবাইল নম্বর বা ইমেইল" className="w-full bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-3 text-xs" />
        <input type="password" placeholder="পাসওয়ার্ড" className="w-full bg-[#EEEAE1] border border-[#E2DCCF] rounded-xl p-3 text-xs" />
        <button onClick={() => navigateTo('/')} className="w-full bg-[#C6A15B] text-[#0B0B0B] font-bold py-3 rounded-xl text-xs">
          লগইন করুন
        </button>
      </div>
    </div>
  );
}

function PolicyPage({ title }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
      <h2 className="text-2xl font-extrabold gold-gradient-text">{title}</h2>
      <p className="text-xs text-[#55514A] leading-relaxed">
        HASIB MART তে কেনাকাটা করার জন্য ধন্যবাদ। আমরা সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা প্রদান করি। ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৪ দিনের মধ্যে হোম ডেলিভারি দেওয়া হয়।
      </p>
    </div>
  );
}

// ==========================================
// 14. FOOTER & NAVIGATION EXTRA
// ==========================================
function Footer() {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#0A1115] border-t border-[#E2DCCF] pt-12 pb-20 md:pb-12 text-xs text-[#55514A]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C6A15B] flex items-center justify-center text-[#0B0B0B]">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="font-extrabold text-base text-[#C6A15B]">HASIB MART</h3>
          </div>
          <p className="text-[11px] text-[#777168] leading-relaxed">
            আপনার বিশ্বস্ত অনলাইন শপিং গন্তব্য। প্রিমিয়াম কোয়ালিটির পোশাক, জুতা, গ্যাজেট ও হোম এপ্ল্যায়েন্স।
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-[#171717]">গুরুত্বপূর্ণ লিংক</h4>
          <ul className="space-y-2 text-[#55514A]">
            <li><button onClick={() => navigateTo('/shop')} className="hover:text-[#C6A15B]">সব প্রোডাক্ট</button></li>
            <li><button onClick={() => navigateTo('/track-order')} className="hover:text-[#C6A15B]">অর্ডার ট্র্যাকিং</button></li>
            <li><button onClick={() => navigateTo('/shipping-policy')} className="hover:text-[#C6A15B]">ডেলিভারি পলিসি</button></li>
            <li><button onClick={() => navigateTo('/return-policy')} className="hover:text-[#C6A15B]">রিটার্ন নীতি</button></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-[#171717]">যোগাযোগ</h4>
          <p className="text-[#777168]">হটলাইন: +880 1700-000000</p>
          <p className="text-[#777168]">ইমেইল: support@আপনার-ইমেইল-এখানে-দিন</p>
          <p className="text-[#777168]">মিরপুর, ঢাকা - ১২১৬, বাংলাদেশ</p>
        </div>

        {/* Guaranteed Services */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-[#171717]">নিরাপদ পেমেন্ট</h4>
          <p className="text-[11px] text-[#777168]">
            ক্যাশ অন ডেলিভারি, বিকাশ ও নগদের মাধ্যমে নিরাপদ মূল্য পরিশোধের সুবিধা।
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-[#E2DCCF]/50 text-center text-[11px] text-[#777168]">
        © ২০২৬ HASIB MART - সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}

function MobileBottomNav() {
  const { navigateTo, currentPath, cart, setIsCartOpen } = useShop();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A1115] border-t border-[#E2DCCF] py-2 px-4 z-40 flex justify-between items-center text-[10px]">
      <button onClick={() => navigateTo('/')} className={`flex flex-col items-center gap-1 ${currentPath === '/' ? 'text-[#C6A15B]' : 'text-[#777168]'}`}>
        <ShoppingBag className="w-5 h-5" />
        <span>হোম</span>
      </button>

      <button onClick={() => navigateTo('/shop')} className={`flex flex-col items-center gap-1 ${currentPath === '/shop' ? 'text-[#C6A15B]' : 'text-[#777168]'}`}>
        <Search className="w-5 h-5" />
        <span>শপ</span>
      </button>

      <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-[#777168] relative">
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 right-2 bg-[#EF3038] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
        <span>কার্ট</span>
      </button>

      <button onClick={() => navigateTo('/wishlist')} className={`flex flex-col items-center gap-1 ${currentPath === '/wishlist' ? 'text-[#C6A15B]' : 'text-[#777168]'}`}>
        <Heart className="w-5 h-5" />
        <span>উইশলিস্ট</span>
      </button>

      <button onClick={() => navigateTo('/admin')} className={`flex flex-col items-center gap-1 ${currentPath === '/admin' ? 'text-[#C6A15B]' : 'text-[#777168]'}`}>
        <User className="w-5 h-5" />
        <span>এডমিন</span>
      </button>
    </div>
  );
}

function FloatingWhatsAppButton() {
  const { whatsappNumber } = useShop();

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 md:bottom-6 right-4 z-40 bg-[#16A34A] hover:bg-[#15803D] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110"
      title="WhatsApp এ কথা বলুন"
    >
      <Send className="w-6 h-6" />
    </a>
  );
}