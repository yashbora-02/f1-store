import React from 'react';
import jacket from './photos/jj.jpg';
import bgVideo from './photos/bg.mp4';
import c1 from './photos/c1.jpg';
import c2 from './photos/c2.jpg';
import c3 from './photos/c3.jpg';
import c4 from './photos/c4.jpg';
import c5 from './photos/c5.jpg';
import c6 from './photos/c6.jpg';
import c7 from './photos/c7.jpg';
import c8 from './photos/c8.jpg';
import c9 from './photos/c9.jpg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const HotDealsScroller = () => (
  <div className="relative w-32 h-[400px] flex flex-col items-center justify-center overflow-hidden bg-[#EA482F] border-l border-r border-white">
    <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col animate-hotdeals-scroll h-[200%]">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center h-full"
          >
            <span
              className="text-black text-lg font-bold font-sans -rotate-90 whitespace-nowrap"
              style={{ display: 'inline-block' }}
            >
              • Hot Deals • Hot Deals •
            </span>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @keyframes hotdeals-scroll {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      .animate-hotdeals-scroll {
        animation: hotdeals-scroll 8s linear infinite;
        height: 200%;
      }
    `}</style>
  </div>
);

const products = [
  { src: c1, name: 'Custom Race Jersey', price: '₹22.00' },
  { src: c2, name: 'Race Day Keychain', price: '₹85.00' },
  { src: c3, name: 'Mini F1 Car Model', price: '₹15.00' },
  { src: c4, name: 'F1 Race Poster', price: '₹50.00' },
  { src: c5, name: 'Racing Spirit Hoodie', price: '₹20.00' },
  { src: c6, name: 'Track Day T-Shirt', price: '₹75.00' },
  { src: c7, name: 'Speedster Cap', price: '₹30.00' },
  { src: c8, name: 'Engraved Pit Stop Bottle', price: '₹25.00' },
  { src: c9, name: 'Personalised Racing Mug', price: '₹99.00' },
];

// Define categories for Fan Favorites
const categories = [
  {
    name: 'Apparel',
    items: [products[0], products[4], products[5]], // C1, C5, C6
  },
  {
    name: 'Accessories',
    items: [products[1], products[6], products[8]], // C2, C7, C9
  },
  {
    name: 'Artifacts',
    items: [products[2], products[3], products[7]], // C3, C4, C8
  },
];

function getRandomProducts(arr: Product[], n: number): Product[] {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

const FanFavoritesGrid = () => {
  const [randomProducts] = React.useState<Product[]>(() => getRandomProducts(products, 4));
  return (
    <section className="w-full py-16 bg-[#f7f3f3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-black text-center mb-2">Fan Favorites</h2>
        <hr className="border-t border-gray-300 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {randomProducts.map((product, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow p-6 w-full" style={{aspectRatio: '1/1'}}>
              <img src={product.src} alt={product.name} className="w-full h-60 object-contain mb-4" style={{background:'#f7f3f3'}} />
              <div className="w-full flex flex-col items-center justify-center">
                <div className="text-lg font-semibold text-black mb-1 text-center w-full">{product.name}</div>
                <div className="text-xl font-bold text-[#EA482F] text-center w-full">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// New: Category Sections
interface Product {
  src: string;
  name: string;
  price: string;
}

interface CategorySectionProps {
  title: string;
  items: Product[];
}

// Add cart types
interface CartItem extends Product {
  quantity: number;
}

const App = () => {
  // Cart state and persistence
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [page, setPage] = React.useState<'shop' | 'checkout'>('shop');

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Updated CategorySection with Add to Cart and anchor IDs
  const CategorySection: React.FC<CategorySectionProps & { onAddToCart: (product: Product) => void; id?: string }> = ({ title, items, onAddToCart, id }) => (
    <section id={id} className="w-full py-12 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#EA482F] mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {items.map((product: Product, idx: number) => (
            <div key={idx} className="group flex flex-col items-center bg-[#f7f3f3] rounded-lg shadow p-6 w-full border border-gray-200 hover:shadow-lg transition">
              <img
                src={product.src}
                alt={product.name}
                className="w-full h-48 object-contain mb-4 rounded transition-transform duration-300 group-hover:scale-110"
              />
              <div className="w-full flex flex-col items-center justify-center mb-2">
                <div className="text-lg font-semibold text-black mb-1 text-center w-full">{product.name}</div>
                <div className="text-xl font-bold text-[#EA482F] text-center w-full mb-2">{product.price}</div>
              </div>
              <button
                className="mt-auto bg-[#EA482F] text-white font-semibold px-6 py-2 rounded w-full hover:bg-[#c93c22] transition"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Checkout Page
  const CheckoutPage = () => {
    const checkoutRef = React.useRef<HTMLDivElement>(null);
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity, 0);
    // WhatsApp message (formatted)
    const waMessage = encodeURIComponent(
      `🛒 *Turbosoul Order Summary* 🛒\n\n` +
      cart.map(item => `• *${item.name}* (x${item.quantity}) - ${item.price}`).join('\n') +
      `\n\n*Total:* ₹${total.toFixed(2)}\n\nThank you for shopping with us!`
    );
    const waLink = `https://wa.me/+919359588400?text=${waMessage}`;

    // Remove item handler
    const handleRemove = (name: string) => {
      setCart(prev => prev.filter(item => item.name !== name));
    };

    return (
      <section className="min-h-screen bg-[#f7f3f3] pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 bg-white rounded-lg shadow p-8">
          <h2 className="text-4xl font-bold text-[#EA482F] mb-8 text-center">Checkout</h2>
          <div className="text-xs text-gray-500 mb-6 text-center">Send your order summary directly to WhatsApp for a smooth purchase experience.</div>
          <div ref={checkoutRef}>
            {cart.length === 0 ? (
              <div className="text-center text-lg text-gray-500 mb-8">Your cart is empty.</div>
            ) : (
              <>
                <div className="mb-8">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-gray-200 py-4">
                      <div className="flex items-center gap-4">
                        <img src={item.src} alt={item.name} className="w-20 h-20 object-contain rounded bg-[#f7f3f3]" />
                        <div>
                          <div className="font-semibold text-black">{item.name}</div>
                          <div className="text-gray-600">Price: {item.price}</div>
                          <div className="text-gray-600">Quantity: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xl font-bold text-[#EA482F]">₹{(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</div>
                        <button
                          className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          onClick={() => handleRemove(item.name)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-2xl font-bold mb-8">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#25D366] text-white font-bold py-3 rounded-lg text-lg mb-6 shadow hover:bg-[#1ebe57] transition"
                  style={{letterSpacing: '0.5px'}}
                >
                  <span className="inline-block align-middle mr-2" aria-label="whatsapp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05C13.7 27.633 14.836 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.04 0-2.062-.162-3.027-.48l-.216-.07-4.65 1.22 1.24-4.527-.14-.23C7.08 18.13 6.333 16.6 6.333 15c0-5.303 4.303-9.667 9.667-9.667S25.667 9.697 25.667 15 21.364 25.667 16 25.667zm6.09-7.13c-.334-.167-1.98-.98-2.287-1.09-.307-.112-.53-.167-.753.167-.22.334-.86 1.09-1.055 1.313-.194.22-.388.25-.72.083-.334-.167-1.41-.52-2.687-1.66-.993-.885-1.664-1.977-1.86-2.31-.194-.334-.021-.513.146-.68.15-.15.334-.388.5-.582.167-.194.222-.334.334-.557.11-.223.055-.417-.027-.584-.083-.167-.753-1.82-1.03-2.49-.272-.653-.55-.563-.753-.573l-.64-.012c-.222 0-.584.083-.89.417-.307.334-1.17 1.143-1.17 2.787 0 1.644 1.198 3.233 1.364 3.457.167.223 2.36 3.6 5.72 4.907.8.276 1.423.44 1.91.563.803.204 1.535.175 2.113.106.645-.077 1.98-.81 2.26-1.594.28-.783.28-1.454.196-1.594-.083-.14-.305-.223-.64-.39z"/>
                    </svg>
                  </span>
                  Send Order on WhatsApp
                </a>
              </>
            )}
          </div>
          <button
            className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-900 transition w-full"
            onClick={() => setPage('shop')}
          >
            Back to Shop
          </button>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-[#EA482F] h-20 flex items-center justify-between px-8 fixed top-0 left-0 z-50 border-b border-black/20">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center mr-2">
            <div className="w-6 h-6 bg-white" style={{clipPath: 'polygon(0 100%, 0 60%, 60% 0, 100% 0, 100% 40%, 40% 100%)'}}></div>
          </div>
          <span className="text-xl font-medium text-black">Turbosoul</span>
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex gap-10 text-lg">
          <a href="#apparel" className="text-black hover:underline">Apparel</a>
          <a href="#accessories" className="text-black hover:underline">Accessories</a>
          <a href="#artifacts" className="text-black hover:underline">Artifacts</a>
        </div>
        {/* Cart Icon */}
        <div className="text-2xl text-black relative flex items-center cursor-pointer" onClick={() => setPage('checkout')}>
          {/* Bold Modern SVG Shopping Cart Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M2.5 3H5l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21.5 6H6" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-2 py-0.5 font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          )}
        </div>
      </nav>

      {page === 'checkout' ? (
        <CheckoutPage />
      ) : (
        <>
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#8d6cb7] relative text-center overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src={bgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Content Overlay */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center h-full">
              {/* Removed hero texts and Shop Now button */}
            </div>
          </section>

          {/* Hot Deals Section */}
          <section className="w-full flex flex-row min-h-[400px] h-[400px]">
            {/* Left Column */}
            <div className="flex-[2] flex flex-col justify-center pl-24 pr-8 py-16 bg-[#e8836a] h-full">
              <h2 className="text-5xl md:text-6xl font-extrabold text-black mb-8">Limited-Time F1<br />Specials Await You</h2>
              <p className="text-lg text-black mb-8">Catch the F1 Fever</p>
              <button className="bg-black text-[#e8836a] text-lg font-medium px-12 py-4 rounded-none hover:bg-gray-900 transition w-60">Get Deal</button>
            </div>
            {/* Middle Column: Animated Hot Deals */}
            <HotDealsScroller />
            {/* Right Column: Actual Image */}
            <div className="flex-[2] h-full flex items-center justify-center bg-white w-full">
              <img src={jacket} alt="F1 Jacket" className="w-full h-full object-cover" />
            </div>
          </section>

          {/* Category Sections */}
          <CategorySection id="apparel" title="Apparel" items={categories[0].items} onAddToCart={handleAddToCart} />
          <CategorySection id="accessories" title="Accessories" items={categories[1].items} onAddToCart={handleAddToCart} />
          <CategorySection id="artifacts" title="Artifacts" items={categories[2].items} onAddToCart={handleAddToCart} />
          <FanFavoritesGrid />

          <section className="w-full bg-[#f7f3f3] py-16 border-t border-gray-300">
            <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
              <h2 className="text-5xl font-extrabold text-black mb-2">Our Story</h2>
              <div className="text-xl text-black/80 mb-4 font-semibold">Who We Are</div>
              <p className="text-base text-black/70 mb-8 max-w-2xl">
                At Turbosoul, we are more than just an online store. We are a haven for Formula 1 enthusiasts, offering a curated collection of genuine merchandise. Dive into the world of F1 with our high-quality products, personalized for you. Join us in celebrating the passion and camaraderie of the Formula 1 community through our exclusive range of items.
              </p>
              <button className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-900 transition">Learn More</button>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#222] text-white py-8 mt-auto border-t border-black/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold mb-2">Turbosoul</span>
            <span className="text-sm text-gray-300">Official Formula 1 Merchandise Store</span>
            <span className="text-sm text-gray-400 mt-2">Email: info@turbosoul.com</span>
            <span className="text-sm text-gray-400">Phone: +91 98765 43210</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-sm text-gray-400">© {new Date().getFullYear()} Turbosoul. All rights reserved.</span>
            <span className="text-sm text-gray-400">Made with ❤️ for F1 fans</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;