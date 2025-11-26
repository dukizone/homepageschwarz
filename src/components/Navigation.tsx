
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Permanent style (formerly 'scrolled' state)
  const navClass = "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md shadow-sm";

  return (
    <>
      <nav className={navClass}>
        {/* LEFT: Logo */}
        <div 
          className="cursor-pointer z-10"
          onClick={() => scrollTo(SectionId.HERO)}
        >
          <img 
            src="http://familienurlaub-im-schwarzwald.de/wp-content/uploads/2025/11/schwarzwald-logo.png" 
            alt="Familienurlaub im Schwarzwald" 
            className="h-12 md:h-16 w-auto object-contain transition-all duration-300"
          />
        </div>

        {/* CENTER: Desktop Menu (Absolutely Positioned) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 items-center">
          {[
            { id: SectionId.LISTINGS, label: 'Ferienwohnungen' },
            { id: SectionId.REVIEWS, label: 'Bewertungen' },
            { id: SectionId.GUIDE, label: 'Reiseführer' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-medium transition-colors text-sm uppercase tracking-wider text-forest-800 hover:text-forest-500 whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT: Contact Button (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={() => scrollTo(SectionId.CONTACT)}
            className="hidden md:block px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-lg bg-forest-700 text-white hover:bg-forest-600"
          >
            Kontakt
          </button>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-forest-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} className="text-forest-900" /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-forest-50/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {[
            { id: SectionId.LISTINGS, label: 'Ferienwohnungen' },
            { id: SectionId.REVIEWS, label: 'Bewertungen' },
            { id: SectionId.GUIDE, label: 'Reiseführer' },
            { id: SectionId.CONTACT, label: 'Kontakt' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-forest-900 text-2xl font-bold hover:text-forest-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-forest-900"
          >
            <X size={32} />
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
