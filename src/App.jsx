import { useEffect, useRef, useState } from "react";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    image: "https://cdn.pixabay.com/photo/2017/07/31/23/18/white-2561942_1280.jpg",
    categories: ["Electronics", "Audio", "Accessories"],
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://cdn.pixabay.com/photo/2015/06/25/17/22/smart-watch-821559_1280.jpg",
    categories: ["Electronics", "Wearables", "Accessories"],
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop Pro",
    price: 1299.99,
    image: "https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg",
    categories: ["Electronics", "Computers", "Office"],
    rating: 4.8,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 49.99,
    image: "https://cdn.pixabay.com/photo/2017/05/24/21/33/workplace-2341642_1280.jpg",
    categories: ["Electronics", "Accessories", "Office"],
    rating: 4.3,
  },
  {
    id: 5,
    name: "Gaming Console",
    price: 499.99,
    image: "https://cdn.pixabay.com/photo/2017/05/19/14/09/ps4-2326616_1280.jpg",
    categories: ["Electronics", "Gaming", "Entertainment"],
    rating: 4.7,
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://cdn.pixabay.com/photo/2019/07/02/07/39/bluetooth-4311748_1280.jpg",
    categories: ["Electronics", "Audio", "Accessories"],
    rating: 4.1,
  },
  {
    id: 7,
    name: "4K Monitor",
    price: 349.99,
    image: "https://cdn.pixabay.com/photo/2022/12/18/16/45/collection-7663828_1280.jpg",
    categories: ["Electronics", "Computers", "Office"],
    rating: 4.6,
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://cdn.pixabay.com/photo/2014/09/19/12/06/typewriter-452189_1280.jpg",
    categories: ["Electronics", "Accessories", "Gaming"],
    rating: 4.4,
  },
  {
    id: 9,
    name: "Wireless Earbuds",
    price: 159.99,
    image: "https://cdn.pixabay.com/photo/2020/05/14/09/54/earphones-5193970_1280.jpg",
    categories: ["Electronics", "Audio", "Wearables"],
    rating: 4.3,
  },
  {
    id: 10,
    name: "Tablet Pro",
    price: 799.99,
    image: "https://cdn.pixabay.com/photo/2016/11/19/21/01/analysis-1841158_1280.jpg",
    categories: ["Electronics", "Computers", "Entertainment"],
    rating: 4.5,
  },
  {
    id: 11,
    name: "Smart Home Hub",
    price: 129.99,
    image: "https://cdn.pixabay.com/photo/2017/07/09/03/19/home-2486092_1280.jpg",
    categories: ["Electronics", "Smart Home", "Accessories"],
    rating: 4.2,
  },
  {
    id: 12,
    name: "Gaming Mouse",
    price: 89.99,
    image: "https://cdn.pixabay.com/photo/2022/08/14/16/39/mouse-7386247_1280.jpg",
    categories: ["Electronics", "Gaming", "Accessories"],
    rating: 4.6,
  },
  {
    id: 13,
    name: "Webcam HD",
    price: 69.99,
    image: "https://cdn.pixabay.com/photo/2020/04/26/15/42/videoanruf-5095868_1280.jpg",
    categories: ["Electronics", "Computers", "Office"],
    rating: 4.0,
  },
  {
    id: 14,
    name: "Smart TV",
    price: 899.99,
    image: "https://cdn.pixabay.com/photo/2015/02/07/20/58/tv-627876_1280.jpg",
    categories: ["Electronics", "Entertainment", "Smart Home"],
    rating: 4.7,
  },
  {
    id: 15,
    name: "Phone Charger",
    price: 29.99,
    image: "https://cdn.pixabay.com/photo/2021/04/21/09/59/phone-6195964_1280.jpg",
    categories: ["Electronics", "Accessories", "Mobile"],
    rating: 4.1,
  }
];

function SearchFilters({ categories, selectedCategories, onCategoryChange, onSearchChange }) {
  return (
    <div className="search-filters">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="category-filters">
        {categories.map(category => (
          <label key={category} className="category-checkbox">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
}

function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">ShopEase</div>
      <div className="nav-links">
        <a href="#featured">Featured</a>
        <a href="#categories">Categories</a>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="product-details">
        <span className="price">${product.price}</span>
        <span className="rating">⭐ {product.rating}</span>
      </div>
      <button className="add-to-cart" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function Cart({ items, onClose, onRemoveItem, onUpdateQty, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    <div className="qty-controls">
                      <button onClick={() => onUpdateQty(item.id, -1)} aria-label="Decrease">−</button>
                      <span className="qty">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, +1)} aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div className="item-actions">
                    <div className="line-total">${(item.price * item.quantity).toFixed(2)}</div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="total">Total: ${total.toFixed(2)}</div>
              <div style={{display:'flex',gap:12}}>
                <button className="checkout-btn" onClick={() => onCheckout && onCheckout(total)}>Checkout</button>
                <button className="checkout-secondary" onClick={onClose}>Continue shopping</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Checkout({ amount = 0, vpa = 'vikasz4@ybl', onClose, onPaid }) {
  // Build UPI URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent('ShopEase')}&am=${encodeURIComponent(amount.toFixed(2))}&cu=INR&tn=${encodeURIComponent('ShopEase Order')}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(upiUri)}`;

  const copyVpa = async () => {
    try {
      await navigator.clipboard.writeText(vpa);
      alert('VPA copied to clipboard');
    } catch (e) {
      // fallback
      prompt('Copy this VPA', vpa);
    }
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Pay via UPI</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="checkout-body">
          <div className="order-summary">
            <h3>Order total</h3>
            <div className="order-amount">₹ {amount.toFixed(2)}</div>
            <p className="small">Scan the QR code with any UPI app or copy the VPA and pay manually.</p>
          </div>

          <div className="qr-area">
            <img src={qrSrc} alt="UPI QR code" />
            <div className="vpa-row">
              <code className="vpa">{vpa}</code>
              <button className="copy-btn" onClick={copyVpa}>Copy</button>
            </div>
            <p className="small muted">UPI URI: <code style={{display:'inline'}}>{upiUri}</code></p>
          </div>
        </div>

        <div className="checkout-actions">
          <button className="confirm-paid" onClick={() => onPaid && onPaid()}>I have paid</button>
          <button className="checkout-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const featuredRef = useRef(null);
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    // Extract unique categories from all product categories
    const cats = [...new Set(PRODUCTS.flatMap(p => p.categories))];
    setCategories(cats);
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Browse by single category and scroll to featured
  const handleBrowse = (category) => {
    setSelectedCategories([category]);
    // clear search to show category results clearly
    setSearchQuery("");
    // scroll to featured section
    if (featuredRef.current) featuredRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(cat => product.categories.includes(cat));
    return matchesSearch && matchesCategories;
  });

  const addToCart = (product) => {
    setCartItems(items => {
      const existing = items.find(item => item.id === product.id);
      if (existing) {
        return items.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
    // show toast
    setToast({ text: `${product.name} added to cart` });
    setTimeout(() => setToast(null), 1800);
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(items => {
      return items
        .map(i => i.id === productId ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(items => items.filter(item => item.id !== productId));
  };

  // set CSS var for subtle parallax decorations
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll', `${window.scrollY}`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Checkout state
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);

  const handleOpenCheckout = (amount) => {
    setCheckoutAmount(amount || 0);
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePaid = () => {
    // naive: clear cart and close
    setCartItems([]);
    setShowCheckout(false);
    alert('Payment confirmed — thank you! Your cart is now cleared.');
  };

  // Play a short click sound using WebAudio
  useEffect(() => {
    let ctx = null;
    const playClickSound = () => {
      try {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880; // A5
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.2);
      } catch (e) {
        /* ignore audio errors */
      }
    };

    const handler = (ev) => {
      // play sound only for interactive elements (buttons, links)
      const target = ev.target;
      if (target && (target.closest && target.closest('button, a, .add-to-cart, .browse-btn, .cart-btn, .confirm-paid, .copy-btn'))) {
        playClickSound();
      }
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
      if (ctx && ctx.close) ctx.close();
    };
  }, []);

  return (
    <div className="app">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <header className="hero">
        <div className="animated-gradient" aria-hidden />
        <div className="hero-content">
          <h1>Welcome to ShopEase</h1>
          <p>Discover amazing products at great prices</p>
          <div className="hero-ctas">
            <button className="browse-cta" onClick={() => featuredRef.current?.scrollIntoView({behavior:'smooth'})}>Explore Featured</button>
            <button className="browse-cta ghost" onClick={() => setShowCart(true)}>Open Cart ({cartItems.reduce((s,i)=>s+i.quantity,0)})</button>
          </div>
        </div>
      </header>

      <main>
        <SearchFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={toggleCategory}
          onSearchChange={setSearchQuery}
        />

        <section id="featured" ref={featuredRef} className="featured">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section id="categories" className="categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            {categories.map(category => (
              <div key={category} className="category-card">
                <h3>{category}</h3>
                <button className="browse-btn" onClick={() => handleBrowse(category)}>Browse</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showCart && (
        <Cart 
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemoveItem={removeFromCart}
          onUpdateQty={updateQuantity}
          onCheckout={handleOpenCheckout}
        />
      )}

      {showCheckout && (
        <Checkout amount={checkoutAmount} onClose={() => setShowCheckout(false)} onPaid={handlePaid} />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast" role="status">{toast.text}</div>
      )}

      <footer className="footer">
        <p>© 2024 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}