import React, { useState } from 'react';
import { Users, BedDouble, Check, CalendarDays, X, ArrowRight } from 'lucide-react';
import { ACCOMMODATIONS } from '../constants';
import { SectionId, Accommodation } from '../types';
import AvailabilityCalendar from './AvailabilityCalendar';
import BookingModal from './BookingModal';

const Accommodations: React.FC = () => {
  const [openCalendarId, setOpenCalendarId] = useState<string | null>(null);
  
  // Selection State
  const [selectedDates, setSelectedDates] = useState<{start: Date | null, end: Date | null}>({start: null, end: null});
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

  const toggleCalendar = (id: string) => {
    if (openCalendarId === id) {
      setOpenCalendarId(null);
      // Reset dates when closing
      setSelectedDates({start: null, end: null});
    } else {
      setOpenCalendarId(id);
      setSelectedDates({start: null, end: null});
    }
  };

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setSelectedDates({start, end});
  };

  const handleOpenBooking = (acc: Accommodation) => {
    setSelectedAccommodation(acc);
    setIsModalOpen(true);
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  };

  return (
    <section id={SectionId.LISTINGS} className="py-24 px-6 md:px-20 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">Unsere Rückzugsorte</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jedes Haus wurde mit Liebe zum Detail eingerichtet, um Ihnen ein Gefühl von Heimat im Wald zu geben.
          </p>
        </div>

        {/* Grid adjusted for 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {ACCOMMODATIONS.map((acc) => (
            <div 
              key={acc.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={acc.image} 
                  alt={acc.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-forest-900 px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                  ★ {acc.rating}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="text-sm text-forest-500 font-semibold mb-2 uppercase tracking-wider">{acc.type}</div>
                <h3 className="text-2xl font-bold text-forest-900 mb-4">{acc.title}</h3>
                
                <div className="flex gap-6 text-gray-500 text-sm mb-6 border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{acc.guests} Gäste</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble size={18} />
                    <span>{acc.bedrooms} Schlafzimmer</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {acc.features.map(f => (
                    <span key={f} className="text-sm bg-forest-50 text-forest-700 px-3 py-1 rounded-md flex items-center gap-1">
                      <Check size={12} /> {f}
                    </span>
                  ))}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between mt-auto gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400">ab</span>
                    <span className="text-3xl font-bold text-forest-900">{acc.price}€</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleCalendar(acc.id)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all border-2 flex items-center gap-2 ${
                        openCalendarId === acc.id 
                          ? 'bg-forest-100 border-forest-200 text-forest-800' 
                          : 'bg-white border-forest-100 text-forest-700 hover:border-forest-300'
                      }`}
                    >
                      {openCalendarId === acc.id ? <X size={20} /> : <CalendarDays size={20} />}
                      <span className="hidden sm:inline">
                         {openCalendarId === acc.id ? 'Schließen' : 'Verfügbarkeit'}
                      </span>
                    </button>
                    <button 
                      onClick={() => handleOpenBooking(acc)}
                      className="bg-forest-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-forest-600 transition-colors shadow-lg shadow-forest-700/10"
                    >
                      Buchen
                    </button>
                  </div>
                </div>

                {/* Calendar Drawer */}
                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openCalendarId === acc.id ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
                `}>
                  <div className="pt-6 border-t border-gray-100 bg-white rounded-b-2xl">
                    <div className="flex items-center justify-between mb-4">
                       <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <CalendarDays size={16} className="text-forest-500"/>
                        Wunschtermin wählen
                      </h4>
                      {selectedDates.start && selectedDates.end && (
                        <span className="text-sm font-bold text-forest-700 bg-forest-50 px-3 py-1 rounded-full">
                          {formatDateShort(selectedDates.start)} - {formatDateShort(selectedDates.end)}
                        </span>
                      )}
                    </div>
                   
                    {openCalendarId === acc.id && (
                      <div className="flex flex-col gap-4">
                        <AvailabilityCalendar 
                          icalUrls={[acc.icalUrl]} 
                          onSelectRange={handleDateSelect}
                          selectedStart={selectedDates.start}
                          selectedEnd={selectedDates.end}
                        />
                        
                        <button 
                          disabled={!selectedDates.start || !selectedDates.end}
                          onClick={() => handleOpenBooking(acc)}
                          className={`
                            w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                            ${selectedDates.start && selectedDates.end 
                              ? 'bg-forest-700 text-white shadow-lg hover:bg-forest-600 transform hover:-translate-y-1' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                          `}
                        >
                          Unverbindliche Anfrage stellen
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedAccommodation && (
        <BookingModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accommodation={selectedAccommodation}
          startDate={selectedDates.start}
          endDate={selectedDates.end}
        />
      )}
    </section>
  );
};

export default Accommodations;