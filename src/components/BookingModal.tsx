
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CalendarDays, Users, Send, CheckCircle } from 'lucide-react';
import { Accommodation } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation: Accommodation;
  startDate: Date | null;
  endDate: Date | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, accommodation, startDate, endDate }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const formatDate = (date: Date | null) => {
    if (!date) return '...';
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-forest-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-[float_0.3s_ease-out]">
        
        {/* Header */}
        <div className="bg-forest-50 p-6 flex justify-between items-start border-b border-forest-100">
          <div>
            <h3 className="text-xl font-bold text-forest-900">Buchungsanfrage</h3>
            <p className="text-sm text-forest-600">{accommodation.title}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 transition-colors shadow-sm">
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
           <div className="p-12 flex flex-col items-center justify-center text-center h-full">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-[bounce_0.5s_ease-out]">
                <CheckCircle size={32} />
             </div>
             <h4 className="text-2xl font-bold text-forest-900 mb-2">Anfrage versendet!</h4>
             <p className="text-gray-600 mb-8">Vielen Dank für Ihr Interesse. Wir haben Ihre Daten erhalten und prüfen die Verfügbarkeit sofort. Sie hören in Kürze von uns.</p>
             <button 
               onClick={onClose}
               className="bg-forest-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors"
             >
               Zurück zur Website
             </button>
           </div>
        ) : (
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <style>{`
              .custom-scrollbar::-webkit-scrollbar { width: 6px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
            `}</style>
            
            {/* Booking Summary */}
            <div className="bg-forest-50/50 rounded-xl p-4 mb-6 border border-forest-100 flex gap-4 items-center">
              <div className="bg-white p-3 rounded-lg shadow-sm text-forest-700">
                <CalendarDays size={24} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Gewählter Zeitraum</div>
                <div className="font-bold text-forest-900 text-lg">
                  {formatDate(startDate)} — {formatDate(endDate)}
                </div>
                {endDate && (
                   <div className="text-xs text-forest-600 font-medium mt-1">
                     {calculateNights()} Nächte
                   </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Vorname</label>
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-forest-500 outline-none" placeholder="Max" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Nachname</label>
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-forest-500 outline-none" placeholder="Mustermann" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Email Adresse</label>
                <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-forest-500 outline-none" placeholder="max@beispiel.de" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Gäste</label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-forest-500 outline-none appearance-none">
                      {[...Array(accommodation.guests)].map((_, i) => (
                        <option key={i} value={i+1}>{i+1} Personen</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Telefon (Optional)</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-forest-500 outline-none" placeholder="+49..." />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Nachricht an uns</label>
                <textarea rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-forest-500 outline-none" placeholder="Besondere Wünsche, Fragen zum Haus..."></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-forest-700 text-white font-bold py-4 rounded-xl hover:bg-forest-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-forest-900/10 active:scale-[0.98]"
                >
                  {status === 'sending' ? (
                    <span>Sende...</span>
                  ) : (
                    <>
                      <span>Unverbindliche Anfrage senden</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">Es entstehen noch keine Kosten. Die Buchung wird erst nach Bestätigung verbindlich.</p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BookingModal;
