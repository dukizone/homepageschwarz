
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-24 px-6 md:px-20 bg-forest-900 text-white relative z-10 overflow-hidden">
      {/* Background Gradient for depth */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-forest-800/40 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-20">
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 relative group">
           {/* Decorative Frame */}
           <div className="absolute inset-0 bg-forest-700 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6 shadow-2xl"></div>
           
           <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
             <img 
                src="http://familienurlaub-im-schwarzwald.de/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-17-at-19.45.57.jpeg" 
                alt="Familie Weber" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
           </div>

            {/* Floating Badge */}
             <div className="absolute -bottom-8 -right-8 bg-forest-500 text-white p-6 rounded-2xl shadow-xl hidden lg:block transform hover:-translate-y-1 transition-transform">
              <p className="font-handwriting text-xl font-bold">"Wir freuen uns auf Sie!"</p>
            </div>
        </div>

        {/* Text & Contact Details Side */}
        <div className="w-full md:w-1/2">
            <div className="inline-block px-4 py-1.5 bg-forest-800 rounded-full text-forest-300 text-sm font-bold tracking-wider uppercase mb-6">
              Persönlich für Sie da
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
              Ihre Gastgeber <br/>
              <span className="text-forest-400">im Schwarzwald</span>
            </h2>
            
            <p className="text-forest-100/90 mb-12 text-lg leading-relaxed">
              Seit über 20 Jahren begrüßen wir, Familie Weber, Gäste in unserem Zuhause. 
              Unser Herz schlägt für diese Region und wir möchten, dass Sie sich bei uns nicht wie in einem Hotel, 
              sondern wie bei Freunden fühlen. Melden Sie sich gerne direkt bei uns!
            </p>
            
            <div className="space-y-4">
               {/* Phone */}
               <a href="tel:+497611234567" className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-forest-500/30 transition-all group">
                 <div className="w-14 h-14 bg-forest-800 rounded-full flex items-center justify-center text-forest-400 group-hover:bg-forest-700 group-hover:text-white transition-colors shadow-lg">
                    <Phone size={24} />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-forest-400 uppercase tracking-widest mb-1">Rufen Sie uns an</div>
                    <div className="font-bold text-xl md:text-2xl text-white">+49 761 1234567</div>
                 </div>
               </a>
               
               {/* Email */}
               <a href="mailto:hallo@schwarzwald-ferien.de" className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-forest-500/30 transition-all group">
                 <div className="w-14 h-14 bg-forest-800 rounded-full flex items-center justify-center text-forest-400 group-hover:bg-forest-700 group-hover:text-white transition-colors shadow-lg">
                    <Mail size={24} />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-forest-400 uppercase tracking-widest mb-1">Schreiben Sie uns</div>
                    <div className="font-bold text-xl md:text-2xl text-white">hallo@schwarzwald-ferien.de</div>
                 </div>
               </a>

               {/* Address - Styled consistently with Phone/Email */}
               <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all">
                 <div className="w-14 h-14 bg-forest-800 rounded-full flex items-center justify-center text-forest-400 shadow-lg">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-forest-400 uppercase tracking-widest mb-1">Hier finden Sie uns</div>
                    <div className="font-bold text-xl md:text-2xl text-white">Musterweg 1, 79868 Feldberg</div>
                 </div>
               </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
