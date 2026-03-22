import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, 
  MessageCircle, ArrowLeft, Instagram, 
  Truck, CreditCard, Sparkles, Loader2, Shirt
} from 'lucide-react';

// --- CONFIGURATION API GEMINI ---
// Note: apiKey est géré par l'environnement
const apiKey = ""; 

const fetchGemini = async (prompt, systemInstruction = "") => {
  // ARRÊT IMMÉDIAT SI PAS DE CLÉ (Évite de faire tourner le bouton dans le vide)
  if (!apiKey || apiKey === "") {
    throw new Error("Clé API manquante");
  }
  
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
        })
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (i === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

const ASSETS = {
  LOGO: "/logo.png",
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

const AIStyleAdvisor = () => {
  const [occasion, setOccasion] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const getStyleAdvice = async () => {
    if (!occasion) return;
    setLoading(true);
    setAdvice(""); // Reset l'ancien texte
    try {
      const result = await fetchGemini(
        `Suggère un look complet utilisant les produits Civitas pour : ${occasion}.`,
        "Tu es un expert en mode 'Terrace Wear' et culture Ultra. Réponds en français de manière percutante."
      );
      setAdvice(result);
    } catch (err) {
      setAdvice("L'Architecte est indisponible. Vérifie ta connexion ou la configuration de la clé.");
    } finally {
      setLoading(false); // ARRÊTE LE SPINNER DANS TOUS LES CAS
    }
  };

  return (
    <div className="bg-[#050505] border border-green-500/10 rounded-[2.5rem] p-6 md:p-12 mt-20 max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Shirt size={180} className="text-green-500" />
      </div>
      <div className="relative z-10 text-center md:text-left">
        <h3 className="text-2xl font-[900] italic uppercase text-white mb-2 flex items-center gap-3 justify-center md:justify-start">
          Architecte de Look <Sparkles size={20} className="text-green-500" />
        </h3>
        <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">L'IA au service de ton identité.</p>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input 
            type="text" 
            placeholder="Ex: Derby, Soirée membre..." 
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="flex-1 bg-black border border-white/5 rounded-xl py-4 px-6 focus:border-green-500 outline-none text-white font-bold text-sm"
          />
          <button 
            onClick={getStyleAdvice}
            disabled={loading || !occasion}
            className="px-8 py-4 bg-white text-black font-[900] rounded-xl uppercase text-[10px] hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : "Générer"}
          </button>
        </div>
        {advice && (
          <div className="bg-black/40 border-l-4 border-green-500 p-6 rounded-xl animate-fade-in text-left">
            <p className="text-gray-300 italic font-bold leading-tight uppercase text-xs tracking-tight">
              {advice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ShopView = ({ addToCart }) => (
  <>
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img src={ASSETS.HOME_JERSEY} className="w-full h-full object-cover opacity-20 scale-105" alt="Bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/95"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in-up">
        <div className="inline-block p-1 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/5 mb-6">
           <img src={ASSETS.LOGO} alt="LOGO" className="w-24 h-24 md:w-36 md:h-36 object-contain brightness-110" />
        </div>
        <h1 className="text-4xl md:text-7xl font-[900] tracking-tighter italic text-white uppercase mb-4 leading-none">
          CIVITAS<span className="text-green-500">.INAU</span>
        </h1>
        <p className="text-green-500 font-black uppercase tracking-[0.4em] text-[7px] md:text-xs mb-8 opacity-80">
          Be a member not just a Number
        </p>
        <button 
          onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })} 
          className="group relative px-10 py-5 bg-white text-black font-[900] uppercase text-[10px] rounded-full overflow-hidden transition-all active:scale-95"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Voir la collection</span>
          <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </section>

    <section id="collection" className="max-w-[1400px] mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-l-4 border-green-500 pl-6">
        <h2 className="text-4xl md:text-6xl font-[900] uppercase italic text-white tracking-tighter">Notre collection</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {PRODUCTS.map((p, index) => (
          <div key={p.id} className="group flex flex-col animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#080808] border border-white/5 group-hover:border-green-500/40 transition-all duration-500">
              <img src={p.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={p.name} />
              <button 
                onClick={() => addToCart(p)}
                className="absolute bottom-4 right-4 p-5 bg-white text-black rounded-2xl shadow-2xl z-20 hover:bg-green-500 hover:text-white active:scale-90 transition-all"
              >
                <Plus size={24} strokeWidth={4} />
              </button>
            </div>
            <div className="mt-6 px-2 text-left">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-700 mb-1">{p.category}</p>
              <h3 className="text-xl font-[900] uppercase text-white group-hover:text-green-500 transition-colors tracking-tight leading-none mb-1">{p.name}</h3>
              <span className="text-2xl font-black text-green-500 block tracking-tighter">{p.price} Dhs</span>
            </div>
          </div>
        ))}
      </div>

      <AIStyleAdvisor />
    </section>
  </>
);

const CartView = ({ cart, setView, updateQty, removeFromCart, totalPrice, totalItems }) => (
  <section className="min-h-screen pt-32 pb-20 px-4 max-w-6xl mx-auto text-white">
    <button onClick={() => setView('shop')} className="flex items-center gap-3 text-gray-600 hover:text-white mb-10 uppercase text-[10px] font-black tracking-widest mx-auto md:mx-0">
      <ArrowLeft size={16} /> Retour
    </button>
    <h2 className="text-5xl md:text-8xl font-[900] uppercase mb-16 italic tracking-tighter leading-none text-center md:text-left text-white">Panier <span className="text-green-500">[{totalItems}]</span></h2>
    {cart.length === 0 ? (
      <p className="text-gray-700 font-black uppercase py-20 tracking-widest text-lg text-center leading-none">Panier Vide.</p>
    ) : (
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-[#080808] p-6 rounded-[2.5rem] border border-white/5">
              <img src={item.image} className="w-20 h-28 object-cover rounded-2xl" alt={item.name} />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-[900] uppercase tracking-tight">{item.name}</h3>
                <p className="text-green-500 font-black">{item.price} Dhs</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-black rounded-xl border border-white/10 p-1">
                  <button onClick={() => updateQty(item.id, -1)} className="p-3 hover:text-green-500"><Minus size={14} /></button>
                  <span className="w-8 text-center font-black">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-3 hover:text-green-500"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-900/40 hover:text-red-500"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#080808] border border-green-500/20 rounded-[2.5rem] p-8 h-fit sticky top-32">
          <div className="flex justify-between items-end mb-8">
            <span className="font-black text-[9px] text-gray-600 tracking-widest uppercase">TOTAL</span>
            <span className="text-4xl font-black text-green-500 tracking-tighter">{totalPrice} Dhs</span>
          </div>
          <button onClick={() => setView('checkout')} className="w-full py-6 bg-green-600 text-black font-[900] rounded-2xl uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-xl">Valider</button>
        </div>
      </div>
    )}
  </section>
);

const CheckoutView = ({ setView, customerInfo, setCustomerInfo, totalPrice, generateWhatsAppLink, isFormValid }) => (
  <section className="min-h-screen pt-32 pb-20 px-4 flex justify-center text-white">
    <div className="max-w-xl w-full flex flex-col gap-6 animate-fade-in-up">
      <button onClick={() => setView('cart')} className="flex items-center gap-2 text-gray-700 hover:text-white text-[10px] font-black uppercase w-fit tracking-widest"><ArrowLeft size={14} /> Panier</button>
      <div className="bg-[#080808] border border-green-500/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <h2 className="text-3xl font-[900] italic uppercase text-center mb-10 tracking-tighter">Livraison</h2>
        <div className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-700 ml-4">Prénom</label>
              <input type="text" value={customerInfo.firstName} onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 focus:border-green-500 outline-none text-white font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-700 ml-4">Nom</label>
              <input type="text" value={customerInfo.lastName} onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 focus:border-green-500 outline-none text-white font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-700 ml-4">Adresse complète</label>
            <input type="text" placeholder="Ville, Quartier..." value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 focus:border-green-500 outline-none text-white font-bold" />
          </div>
          <div className="pt-8 border-t border-white/5 mt-8">
            <div className="flex justify-between items-center mb-8">
                <div><span className="block text-[9px] font-black text-gray-700 uppercase tracking-widest">Total</span><span className="text-5xl font-black text-green-500 tracking-tighter">{totalPrice} Dhs</span></div>
                <img src={ASSETS.LOGO} alt="Logo" className="w-16 h-16 grayscale opacity-10" />
            </div>
            <a href={isFormValid ? generateWhatsAppLink() : "#"} target={isFormValid ? "_blank" : "_self"} className={`flex items-center justify-center gap-3 w-full py-6 rounded-2xl font-black uppercase text-xs transition-all shadow-2xl ${isFormValid ? 'bg-[#25D366] text-black hover:bg-white' : 'bg-gray-900 text-gray-700 cursor-not-allowed opacity-50'}`} onClick={(e) => !isFormValid && e.preventDefault()}><MessageCircle size={24} /> Commander sur WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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

  const updateQty = (id, delta) => setCart(prev => prev.map(item => (item.id === id && item.qty + delta > 0) ? { ...item, qty: item.qty + delta } : item));
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const isFormValid = customerInfo.firstName && customerInfo.lastName && customerInfo.address;

  const generateWhatsAppLink = () => {
    let text = `🟢 *COMMANDE CIVITAS.INAU*\n👤 *CLIENT :* ${customerInfo.firstName} ${customerInfo.lastName}\n📍 *ADRESSE :* ${customerInfo.address}\n\n📦 *CONTENU :*\n`;
    cart.forEach(item => { text += `• ${item.qty}x ${item.name} (${item.price} Dhs)\n`; });
    text += `\n💰 *TOTAL : ${totalPrice} Dhs*`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-green-500 selection:text-black">
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${isScrolled || view !== 'shop' ? 'py-3 bg-black/95 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div onClick={() => setView('shop')} className="cursor-pointer group flex items-center gap-4">
            <div className={`transition-all duration-700 bg-black rounded-xl border border-white/10 p-1 flex items-center justify-center shadow-lg group-hover:border-green-500/50 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
              <img src={ASSETS.LOGO} alt="Logo" className="w-full h-full object-contain brightness-110" />
            </div>
          </div>
          <button onClick={() => setView('cart')} className="relative p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-green-600 transition-all">
            <ShoppingCart size={20} className="text-white" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-green-500 text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-black">{totalItems}</span>}
          </button>
        </div>
      </nav>

      <main>
        {view === 'shop' && <ShopView addToCart={addToCart} />}
        {view === 'cart' && <CartView cart={cart} setView={setView} updateQty={updateQty} removeFromCart={removeFromCart} totalPrice={totalPrice} totalItems={totalItems} />}
        {view === 'checkout' && <CheckoutView setView={setView} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} totalPrice={totalPrice} generateWhatsAppLink={generateWhatsAppLink} isFormValid={isFormValid} />}
      </main>

      <footer className="bg-[#030303] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start"><img src={ASSETS.LOGO} alt="Logo" className="w-12 h-12 grayscale opacity-20 mb-4" /><span className="font-[900] text-2xl tracking-tighter">CIVITAS.INAU</span></div>
            <div><h4 className="font-black uppercase text-green-500 mb-6 text-[10px] tracking-widest">Navigation</h4><ul className="space-y-4 text-[10px] font-black text-gray-700 uppercase tracking-widest"><li><button onClick={() => setView('shop')}>Collection</button></li><li><button onClick={() => setView('cart')}>Panier</button></li></ul></div>
            <div><h4 className="font-black uppercase text-green-500 mb-6 text-[10px] tracking-widest">Contact</h4><ul className="space-y-4 text-[10px] font-black text-gray-700 uppercase tracking-widest"><li><a href="https://instagram.com/civitas.inau" target="_blank" className="hover:text-white flex items-center gap-3 justify-center md:justify-start"><Instagram size={14}/> Instagram</a></li></ul></div>
            <div><h4 className="font-black uppercase text-green-500 mb-6 text-[10px] tracking-widest">Services</h4><ul className="space-y-4 text-gray-800 text-[9px] font-black uppercase tracking-widest"><li><Truck size={14} className="inline mr-2"/> Livraison Rapide</li><li><CreditCard size={14} className="inline mr-2"/> Cash on Delivery</li></ul></div>
          </div>
          <p className="text-[9px] font-black text-gray-900 uppercase text-center tracking-[1em] opacity-30">© 2026 Developed for the Brotherhood</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: black; overflow-x: hidden; letter-spacing: -0.02em; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}