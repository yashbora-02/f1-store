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

function ProductCarousel() {
  const [start, setStart] = React.useState(0);
  const visible = 4;
  const total = products.length;

  // Infinite carousel logic
  const handlePrev = () => {
    setStart((prev) => (prev - 1 + total) % total);
  };
  const handleNext = () => {
    setStart((prev) => (prev + 1) % total);
  };

  // Get the 4 products to display, wrapping around
  const displayed = Array.from({ length: visible }, (_, i) => products[(start + i) % total]);

  return (
    <section className="w-full py-16 bg-[#f7f3f3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-black text-center mb-2">Fan Favorites</h2>
        <hr className="border-t border-gray-300 mb-10" />
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 z-10 p-2 rounded-full bg-white border border-gray-300 shadow transition -translate-x-1/2 top-1/2 -translate-y-1/2 hover:bg-gray-100`}
            aria-label="Previous"
            style={{height: '48px', width: '48px'}}
          >
            <span className="text-2xl">&#60;</span>
          </button>
          {/* Carousel Cards with smooth animation */}
          <div className="w-full overflow-hidden mx-16">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: 'translateX(0)' }}
            >
              {displayed.map((product, idx) => (
                <div key={idx} className="flex flex-col items-center w-80" style={{aspectRatio: '1/1'}}>
                  <img src={product.src} alt={product.name} className="w-full h-72 object-contain mb-4" style={{background:'#f7f3f3'}} />
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className="text-lg font-medium text-black mb-1 text-center w-full">{product.name}</div>
                    <div className="text-base text-black/80 text-center w-full">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`absolute right-0 z-10 p-2 rounded-full bg-white border border-gray-300 shadow transition translate-x-1/2 top-1/2 -translate-y-1/2 hover:bg-gray-100`}
            aria-label="Next"
            style={{height: '48px', width: '48px'}}
          >
            <span className="text-2xl">&#62;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

const App = () => {
  return (
    <div className="min-h-screen bg-white">
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
          <a href="#" className="text-black hover:underline">Home</a>
          <a href="#" className="text-black hover:underline">Welcome</a>
          <a href="#" className="text-black hover:underline">Promotion</a>
          <a href="#" className="text-black hover:underline">Best Sellers</a>
          <a href="#" className="text-black hover:underline">More</a>
        </div>
        {/* Cart Icon */}
        <div className="text-2xl text-black relative flex items-center">
          {/* Bold Modern SVG Shopping Cart Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M2.5 3H5l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21.5 6H6" />
          </svg>
        </div>
      </nav>

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
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
          <p className="text-white text-lg md:text-xl mb-2 mt-8">Official Formula 1 Merchandise Store</p>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Exclusive F1<br />Merchandise for You</h1>
          <button className="mt-4 px-8 py-3 border-2 border-white text-white text-lg rounded transition hover:bg-white hover:text-[#8d6cb7]">Shop Now</button>
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

      {/* Product Carousel Section */}
      <ProductCarousel />

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
    </div>
  );
};

export default App;