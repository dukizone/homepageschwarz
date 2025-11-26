
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center px-6 md:px-20 pt-20 overflow-hidden">
      
      {/* Hero Background Image - 100% Visible, No Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="http://familienurlaub-im-schwarzwald.de/wp-content/uploads/2025/11/hero.png" 
          alt="Schwarzwald Landschaft" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 max-w-2xl pointer-events-auto">
        <div className="inline-block px-4 py-1.5 bg-forest-900/80 backdrop-blur-md text-white rounded-full text-sm font-semibold mb-6 animate-pulse border border-forest-700/50 shadow-lg">
          🌲 Erleben Sie die Natur
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Familienurlaub im <span className="text-forest-400 drop-shadow-md">Schwarzwald</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 max-w-lg leading-relaxed font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Entfliehen Sie dem Alltag in unsere gemütlichen Ferienhäuser. Wo Kinder Abenteuer erleben und Eltern die Stille genießen.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo(SectionId.LISTINGS)}
            className="group bg-forest-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-forest-500 transition-all shadow-xl shadow-black/30 flex items-center justify-center gap-2 border border-transparent"
          >
            Unterkunft finden
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo(SectionId.CONTACT)}
            className="bg-black/30 backdrop-blur-md border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/50 hover:border-white transition-all flex items-center justify-center shadow-lg"
          >
            Kontakt aufnehmen
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
