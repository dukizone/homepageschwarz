
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchBookedDates, isDateBooked } from '../services/icalService';

interface AvailabilityCalendarProps {
  icalUrls: string[]; // Changed from single string to array
  onSelectRange?: (start: Date | null, end: Date | null) => void;
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
}

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ 
  icalUrls, 
  onSelectRange,
  selectedStart,
  selectedEnd
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedRanges, setBookedRanges] = useState<{start: Date, end: Date}[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch all ICS feeds in parallel
        const results = await Promise.all(icalUrls.map(url => fetchBookedDates(url)));
        // Flatten the array of arrays into a single array of ranges
        const allRanges = results.flat();
        
        if (mounted) {
          setBookedRanges(allRanges);
          setLoading(false);
        }
      } catch (e) {
        console.error("Error loading calendars", e);
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, [icalUrls]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Helper to check if a range overlaps with bookings
  const hasBookingOverlap = (start: Date, end: Date) => {
    const s = start.getTime();
    const e = end.getTime();
    // Simple check: iterate days between start and end
    // (A more efficient way exists but for UI responsiveness this is fine for short ranges)
    let curr = new Date(s);
    while (curr.getTime() <= e) {
      if (isDateBooked(curr, bookedRanges)) return true;
      curr.setDate(curr.getDate() + 1);
    }
    return false;
  };

  const handleDayClick = (date: Date, isBooked: boolean, isPast: boolean) => {
    if (isBooked || isPast || !onSelectRange) return;

    // Reset logic: if both selected, or clicked before start, start over
    if ((selectedStart && selectedEnd) || (selectedStart && date < selectedStart)) {
      onSelectRange(date, null);
      return;
    }

    // If start exists and no end, try to set end
    if (selectedStart && !selectedEnd) {
      // Validate overlap
      if (hasBookingOverlap(selectedStart, date)) {
        // Invalid selection (overlap), just reset to new start
        onSelectRange(date, null);
      } else {
        onSelectRange(selectedStart, date);
      }
      return;
    }

    // Default: set start
    onSelectRange(date, null);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Padding
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-10 w-full" />);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      const dateTime = date.getTime();
      
      const isBooked = isDateBooked(date, bookedRanges);
      const isToday = new Date().setHours(0,0,0,0) === dateTime;
      const isPast = dateTime < new Date().setHours(0,0,0,0);

      // Selection State
      const isStart = selectedStart?.getTime() === dateTime;
      const isEnd = selectedEnd?.getTime() === dateTime;
      const isInRange = selectedStart && selectedEnd && dateTime > selectedStart.getTime() && dateTime < selectedEnd.getTime();

      let baseClass = "h-10 w-full flex items-center justify-center text-sm font-medium transition-all relative z-10 ";
      let wrapperClass = "w-full h-10 relative "; // For connecting background
      
      if (isPast) {
        baseClass += "text-gray-300 cursor-not-allowed";
      } else if (isBooked) {
        baseClass += "text-red-300 cursor-not-allowed line-through decoration-red-200";
      } else {
        baseClass += "cursor-pointer hover:font-bold ";
        if (!isStart && !isEnd && !isInRange) {
           baseClass += "text-forest-900 hover:bg-forest-100 rounded-lg";
        }
      }

      if (isToday && !isBooked && !isStart && !isEnd && !isInRange) {
        baseClass += " border border-forest-500 font-bold rounded-lg";
      }

      // Selection Styles
      if (isStart) {
        baseClass += " bg-forest-700 text-white rounded-l-lg shadow-md";
        if (!selectedEnd) baseClass += " rounded-r-lg"; // Round right if single day
      }
      if (isEnd) {
        baseClass += " bg-forest-700 text-white rounded-r-lg shadow-md";
      }
      if (isInRange) {
        baseClass += " bg-forest-100 text-forest-800";
      }

      days.push(
        <div key={i} className={wrapperClass} onClick={() => handleDayClick(date, isBooked, isPast)}>
           {/* Connecting line for range */}
           {(isInRange || isStart) && selectedEnd && (dateTime !== selectedEnd.getTime()) && (
             <div className="absolute top-0 right-0 h-full w-1/2 bg-forest-100 z-0"></div>
           )}
           {(isInRange || isEnd) && selectedStart && (dateTime !== selectedStart.getTime()) && (
             <div className="absolute top-0 left-0 h-full w-1/2 bg-forest-100 z-0"></div>
           )}
           
          <div className={baseClass} title={isBooked ? "Belegt" : "Frei"}>
            {i}
          </div>
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50 rounded-xl">
        <Loader2 className="animate-spin text-forest-500" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-inner p-4 border border-gray-100 select-none">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <span className="font-bold text-forest-900 text-lg">
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0 mb-2 text-center">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {renderDays()}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-gray-500 px-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-forest-700"></div>
            <span>Auswahl</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
            <span>Belegt</span>
          </div>
        </div>
        {selectedStart && !selectedEnd && (
          <span className="text-forest-600 font-medium animate-pulse">Enddatum wählen...</span>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
