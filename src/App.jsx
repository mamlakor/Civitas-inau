import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, ArrowRight, 
  MessageCircle, ArrowLeft, ShieldCheck, Instagram, 
  Truck, User, MapPin, CreditCard 
} from 'lucide-react';

// --- CONFIGURATION DES ASSETS ---
const ASSETS = {
  LOGO: "/logo.png", // Assure-toi d'utiliser ton logo nettoyé
  HOME_JERSEY: "/home_jersey.png",
  HOME_SHORT: "/home_short.png",
  AWAY_JERSEY: "/away_jersey.png",
  AWAY_SHORT: "/away_short.png",
  SWEAT: "/sweat.png",
  SCARF: "/scarf.png",
  BALACLAVA: "/balaclava.png",
  PINS: "/pins.png"
};

const PRODUCTS = [
  { id: 1, name: "Maillot Domicile Pro", category: "Maillot", price: 150, image: ASSETS.HOME_JERSEY },
  { id: 2, name: "Short Domicile", category: "Short", price: 50, image: ASSETS.HOME_SHORT },
  { id: 3, name: "Maillot Extérieur", category: "Maillot", price: 150, image: ASSETS.AWAY_JERSEY },
  { id: 4, name: "Short Extérieur", category: "Short", price: 50, image: ASSETS.AWAY_SHORT },
  { id: 5, name: "Sweat Civitas", category: "Sweat", price: 220, image: ASSETS.SWEAT },
  { id: 6, name: "Écharpe Ultras", category: "Accessoire", price: 65, image: ASSETS.SCARF },
  { id: 7, name: "Cagoule", category: "Accessoire", price: 70, image: ASSETS.BALACLAVA },
  { id: 8, name: "Pins Civitas", category: "Accessoire", price: 20, image: ASSETS.PINS }
];

const WHATSAPP_NUMBER = "212762742116";

// --- COMPOSANTS DE VUE (Sortis de App pour corriger le bug de focus) ---

const ShopView = ({ addToCart }) => (
  <>
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#051c12]"> {/* Fond Vert Premium */}
        <img src={ASSETS.HOME_JERSEY} className="w-full h-full object-cover opacity-20 scale-105" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in-up">
        <div className="inline-block p-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 mb-8 shadow-2xl">
           <img src={ASSETS.LOGO} alt="Logo" className="w-28 h-28 md:w-36 md:h-36 object-contain" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic text-white uppercase">
          CIVITAS<span className="text-green-500">.INAU</span>
        </h1>
        <p className="text-green-500 font-black uppercase tracking-[0.4em] text-xs mb-10 opacity-90">
          Be a member not just a Number
        </p>
        <button 
          onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
          className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all hover:scale-105"
        >
          <span className="relative z-10 group-hover:text-white transition-colors">Découvrir le Matériel</span>
          <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </section>

    <section id="collection" className="max-w-[1400px] mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-20 border-l-4 border-green-500 pl-8">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none">La Collection</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {PRODUCTS.map((p, index) => (
          <div key={p.id} className="group flex flex-col animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 group-hover:border-green-500/30 transition-all duration-700">
              <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
              <button 
                onClick={() => addToCart(p)}
                className="absolute bottom-8 right-8 p-5 bg-white text-black rounded-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-green-500"
              >
                <Plus size={24} strokeWidth={3} />
              </button>
            </div>
            <div className="mt-8 px-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">{p.category}</p>
              <h3 className="text-xl font-bold uppercase text-white group-hover:text-green-500 transition-colors">{p.name}</h3>
              <span className="text-2xl font-black text-green-500 mt-1 block tracking-tighter">{p.price} Dhs</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

const CartView = ({ cart, setView, updateQty, removeFromCart, totalPrice, totalItems }) => (
  <section className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto text-white">
    <button onClick={() => setView('shop')} className="flex items-center gap-3 text-gray-500 hover:text-white mb-12 uppercase text-xs font-black tracking-widest group">
      <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Retour Shop
    </button>
    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 italic">
      Panier <span className="text-green-500">[{totalItems}]</span>
    </h2>
    {cart.length === 0 ? (
      <p className="text-gray-600 font-black uppercase text-center py-20 tracking-widest">Le panier est vide</p>
    ) : (
      <div className="grid lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-8">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-8 bg-[#0a0a0a] p-8 rounded-[3rem] border border-white/5">
              <img src={item.image} className="w-24 h-32 object-cover rounded-2xl" alt={item.name} />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold uppercase">{item.name}</h3>
                <p className="text-green-500 font-black text-lg">{item.price} Dhs</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center bg-black rounded-xl border border-white/10 p-1">
                  <button onClick={() => updateQty(item.id, -1)} className="p-3 hover:text-green-500"><Minus size={14} /></button>
                  <span className="w-8 text-center font-bold text-lg">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-3 hover:text-green-500"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500/30 hover:text-red-500 transition-colors"><Trash2 size={22} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#0a0a0a] border border-green-500/20 rounded-[3rem] p-10 h-fit sticky top-32">
          <div className="flex justify-between items-end mb-10">
            <span className="font-black text-xs uppercase text-gray-500">Total</span>
            <span className="text-4xl font-black text-green-500 tracking-tighter">{totalPrice} Dhs</span>
          </div>
          <button onClick={() => setView('checkout')} className="w-full py-6 bg-green-600 text-black font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-green-500 transition-all shadow-lg shadow-green-500/10">Passer à la livraison</button>
        </div>
      </div>
    )}
  </section>
);

const CheckoutView = ({ setView, customerInfo, setCustomerInfo, totalPrice, generateWhatsAppLink, isFormValid }) => (
  <section className="min-h-screen pt-40 pb-20 px-6 flex justify-center text-white">
    <div className="max-w-xl w-full flex flex-col gap-8 animate-fade-in-up">
      <button onClick={() => setView('cart')} className="flex items-center gap-2 text-gray-600 hover:text-white mb-4 text-xs font-bold uppercase tracking-widest w-fit">
        <ArrowLeft size={14} /> Retour Panier
      </button>
      <div className="bg-[#0a0a0a] border border-green-500/20 rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/30"></div>
        <h2 className="text-3xl font-black italic uppercase text-center mb-12">Livraison</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Prénom</label>
              <input 
                type="text" 
                placeholder="Ex: Amine" 
                value={customerInfo.firstName} 
                onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})} 
                className="w-full bg-black border border-white/5 rounded-2xl py-5 px-6 focus:border-green-500 outline-none transition-all text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Nom</label>
              <input 
                type="text" 
                placeholder="Ex: Idrissi" 
                value={customerInfo.lastName} 
                onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})} 
                className="w-full bg-black border border-white/5 rounded-2xl py-5 px-6 focus:border-green-500 outline-none transition-all text-white" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Adresse de livraison</label>
            <input 
              type="text" 
              placeholder="Quartier, Rue, N° de porte..." 
              value={customerInfo.address} 
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} 
              className="w-full bg-black border border-white/5 rounded-2xl py-5 px-6 focus:border-green-500 outline-none transition-all text-white" 
            />
          </div>
          
          <div className="pt-10 border-t border-white/5 mt-10">
            <div className="flex justify-between items-center mb-10">
                <div className="text-left">
                  <span className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Montant total</span>
                  <span className="text-5xl font-black text-green-500 tracking-tighter">{totalPrice} Dhs</span>
                </div>
                <img src={ASSETS.LOGO} alt="Logo" className="w-16 h-16 grayscale opacity-20" />
            </div>
            <a 
              href={isFormValid ? generateWhatsAppLink() : "#"} 
              target={isFormValid ? "_blank" : "_self"} 
              className={`flex items-center justify-center gap-4 w-full py-7 rounded-2xl font-black uppercase text-sm transition-all shadow-2xl ${isFormValid ? 'bg-[#25D366] text-black hover:bg-[#20bd5a] hover:scale-105' : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'}`}
              onClick={(e) => !isFormValid && e.preventDefault()}
            >
              <MessageCircle size={24} /> Valider sur WhatsApp
            </a>
            {!isFormValid && <p className="text-center text-red-500/70 text-[10px] mt-6 uppercase font-bold tracking-widest animate-pulse italic">Remplis tes infos pour envoyer la commande</p>}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPOSANT RACINE ---

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('shop'); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', address: '' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => (item.id === id && item.qty + delta > 0) ? { ...item, qty: item.qty + delta } : item));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const generateWhatsAppLink = () => {
    const orderId = `CVT-${Date.now().toString().slice(-4)}`;
    let text = `🟢 *COMMANDE CIVITAS.INAU*\n`;
    text += `🆔 *N° :* ${orderId}\n\n`;
    text += `👤 *CLIENT :* ${customerInfo.firstName} ${customerInfo.lastName}\n`;
    text += `📍 *ADRESSE :* ${customerInfo.address}\n\n`;
    text += `📦 *DÉTAILS :*\n`;
    cart.forEach(item => { text += `• ${item.qty}x ${item.name} (${item.price} Dhs)\n`; });
    text += `\n💰 *TOTAL : ${totalPrice} Dhs*`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const isFormValid = customerInfo.firstName && customerInfo.lastName && customerInfo.address;

  return (
    <div className="bg-black text-white min-h-screen selection:bg-green-500 selection:text-black">
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${isScrolled || view !== 'shop' ? 'py-4 bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'py-8 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div onClick={() => setView('shop')} className="cursor-pointer group">
            <div className={`transition-all duration-700 bg-black rounded-2xl border border-white/10 p-1.5 flex items-center justify-center shadow-lg group-hover:border-green-500/50 ${isScrolled ? 'w-14 h-14' : 'w-20 h-20'}`}>
              <img src={ASSETS.LOGO} alt="Logo" className="w-full h-full object-contain brightness-110" />
            </div>
          </div>
          <button onClick={() => setView('cart')} className="relative group p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-green-600 transition-all shadow-xl">
            <ShoppingCart size={24} className="text-white group-hover:text-black transition-colors" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-green-500 text-black text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full ring-4 ring-black">{totalItems}</span>}
          </button>
        </div>
      </nav>

      <main className="transition-all duration-500">
        {view === 'shop' && <ShopView addToCart={addToCart} />}
        {view === 'cart' && (
          <CartView 
            cart={cart} 
            setView={setView} 
            updateQty={updateQty} 
            removeFromCart={removeFromCart} 
            totalPrice={totalPrice} 
            totalItems={totalItems} 
          />
        )}
        {view === 'checkout' && (
          <CheckoutView 
            setView={setView} 
            customerInfo={customerInfo} 
            setCustomerInfo={setCustomerInfo} 
            totalPrice={totalPrice} 
            generateWhatsAppLink={generateWhatsAppLink} 
            isFormValid={isFormValid} 
          />
        )}
      </main>

      <footer className="bg-[#030303] border-t border-white/5 pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4">
                <img src={ASSETS.LOGO} alt="Logo" className="w-12 h-12 grayscale opacity-40" />
                <span className="font-black text-2xl tracking-tighter">CIVITAS.INAU</span>
              </div>
              <p className="text-gray-600 text-[10px] leading-relaxed font-bold uppercase tracking-[0.4em] opacity-50 italic">Culture • Passion • Pride</p>
            </div>
            <div>
              <h4 className="font-black uppercase text-green-500 mb-10 text-xs tracking-[0.3em]">Navigation</h4>
              <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-gray-600">
                <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">La Collection</button></li>
                <li><button onClick={() => setView('cart')} className="hover:text-white transition-colors">Ton Panier</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-green-500 mb-10 text-xs tracking-[0.3em]">Connecter</h4>
              <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-gray-600">
                <li><a href="https://instagram.com/civitas.inau" target="_blank" className="hover:text-white transition-colors flex items-center gap-3"><Instagram size={16}/> @civitas.inau</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-green-500 mb-10 text-xs tracking-[0.3em]">Services</h4>
              <div className="space-y-6 text-gray-700 uppercase text-[10px] font-black tracking-widest">
                <div className="flex items-center gap-4"><Truck size={18} /> Livraison Offerte</div>
                <div className="flex items-center gap-4"><CreditCard size={18} /> Paiement Cash</div>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5">
            <p className="text-[10px] font-black text-gray-800 uppercase text-center tracking-[1em]">© 2026 Developed for the Brotherhood</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: black; overflow-x: hidden; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}