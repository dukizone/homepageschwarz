
import React from 'react';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b140d] text-forest-400 pt-24 pb-12 relative z-10">
      
      {/* Decorative Tree Border Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-[99%]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-[#1A2F1E]"></path>
        </svg>
        {/* Pine Tree Silhouette Overlay could go here if using image/complex path, simple geometric slope used for clean transition from contact section */}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 mb-16">
        {/* Brand Column */}
        <div className="space-y-4">
          <h4 className="text-white text-xl font-bold tracking-wider uppercase">Familienurlaub<br/>im Schwarzwald</h4>
          <p className="text-sm leading-relaxed opacity-70">
            Wir schaffen Orte der Ruhe und des Abenteuers. Wo Kinder den Wald entdecken und Eltern durchatmen.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Entdecken</h5>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => scrollTo(SectionId.LISTINGS)} className="hover:text-white transition-colors">Ferienwohnungen</button></li>
            <li><button onClick={() => scrollTo(SectionId.REVIEWS)} className="hover:text-white transition-colors">Bewertungen</button></li>
            <li><button onClick={() => scrollTo(SectionId.GUIDE)} className="hover:text-white transition-colors">Reiseführer</button></li>
            <li><button onClick={() => scrollTo(SectionId.CONTACT)} className="hover:text-white transition-colors">Kontakt</button></li>
          </ul>
        </div>

        {/* Legal / Contact Column */}
        <div>
           <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Rechtliches</h5>
           <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar - Fixed: Removed opacity-50, added text-white */}
      <div className="max-w-7xl mx-auto px-6 border-t border-forest-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white">
        <p>&copy; {new Date().getFullYear()} Familienurlaub im Schwarzwald.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-1">Made with <span className="text-green-500">🌲</span> and ❤️ in the Black Forest.</p>
      </div>
    </footer>
  );
};

export default Footer;
