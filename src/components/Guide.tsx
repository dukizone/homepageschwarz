import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { getForestTips } from '../services/geminiService';
import { SectionId, ChatMessage } from '../types';

const Guide: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    
    // Simulate thinking delay for effect if API is super fast, 
    // but mainly just call the service.
    const answer = await getForestTips(query);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <section id={SectionId.GUIDE} className="py-24 px-6 md:px-20 bg-forest-50 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-forest-600 font-semibold mb-4 bg-white px-4 py-2 rounded-full shadow-sm">
              <Sparkles size={18} />
              <span>Forest AI Concierge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-6">
              Frag Fritz, unseren digitalen Wald-Ranger.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Planen Sie Ihren Tag? Ob kinderfreundliche Wanderwege, der beste Platz für Sonnenuntergänge oder wo es den leckersten Schwarzwälder Kirschkuchen gibt – Fritz weiß Bescheid.
            </p>

            <form onSubmit={handleAsk} className="relative mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="z.B. Leichte Wanderung mit Kindern..."
                className="w-full pl-6 pr-14 py-4 rounded-xl border-2 border-transparent focus:border-forest-500 focus:outline-none shadow-md text-gray-700 bg-white transition-all"
              />
              <button 
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 p-2 bg-forest-700 text-white rounded-lg hover:bg-forest-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              </button>
            </form>

            {response && (
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-forest-500 animate-[fadeIn_0.5s_ease-out]">
                <div className="flex gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-lg">🌲</div>
                  <span className="font-bold text-forest-900">Fritz sagt:</span>
                </div>
                <p className="text-gray-700 italic">"{response}"</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4 translate-y-8">
               <div className="bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-transform">
                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3"><MapPin size={20}/></div>
                 <h4 className="font-bold text-forest-800">Feldberg</h4>
                 <p className="text-xs text-gray-500">Gipfelglück für alle</p>
               </div>
               <div className="bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-transform">
                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3"><MapPin size={20}/></div>
                 <h4 className="font-bold text-forest-800">Titisee</h4>
                 <p className="text-xs text-gray-500">Bootsfahren & Eis</p>
               </div>
             </div>
             <div className="space-y-4">
               <div className="bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-transform">
                 <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-3"><MapPin size={20}/></div>
                 <h4 className="font-bold text-forest-800">Ravennaschlucht</h4>
                 <p className="text-xs text-gray-500">Mystische Pfade</p>
               </div>
               <div className="bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-transform">
                 <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-3"><MapPin size={20}/></div>
                 <h4 className="font-bold text-forest-800">Triberg</h4>
                 <p className="text-xs text-gray-500">Wasserfälle & Uhren</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;