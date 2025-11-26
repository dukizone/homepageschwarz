
interface DateRange {
  start: Date;
  end: Date;
}

export const fetchBookedDates = async (icalUrl: string): Promise<DateRange[]> => {
  try {
    // Using a CORS proxy to bypass browser restrictions for the demo
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(icalUrl);
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch calendar data');
    }

    const text = await response.text();
    return parseIcal(text);
  } catch (error) {
    console.error('Error fetching/parsing calendar:', error);
    return [];
  }
};

const parseIcal = (icalData: string): DateRange[] => {
  const ranges: DateRange[] = [];
  const lines = icalData.split(/\r\n|\n|\r/);
  
  let currentStart: Date | null = null;
  let currentEnd: Date | null = null;

  for (const line of lines) {
    if (line.startsWith('DTSTART;VALUE=DATE:')) {
      const dateStr = line.split(':')[1];
      currentStart = parseIcalDate(dateStr);
    } else if (line.startsWith('DTEND;VALUE=DATE:')) {
      const dateStr = line.split(':')[1];
      currentEnd = parseIcalDate(dateStr);
    } else if (line.startsWith('END:VEVENT')) {
      if (currentStart && currentEnd) {
        // Airbnb ICS DTEND is exclusive (the day of checkout), which is usually available for check-in.
        // However, for visualization, we might mark it as "busy" or handle half-days.
        // For simplicity in this view: Mark the night as booked.
        ranges.push({ start: currentStart, end: currentEnd });
      }
      currentStart = null;
      currentEnd = null;
    }
  }

  return ranges;
};

const parseIcalDate = (dateStr: string): Date => {
  // Format: YYYYMMDD
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1; // JS months are 0-indexed
  const day = parseInt(dateStr.substring(6, 8), 10);
  return new Date(year, month, day);
};

export const isDateBooked = (date: Date, ranges: DateRange[]): boolean => {
  // Normalize date to check just YYYY-MM-DD
  const checkTime = date.getTime();
  
  return ranges.some(range => {
    // range.end is exclusive in standard iCal for full day events, meaning check-out day.
    // Usually check-out morning is blocked for previous night staying.
    // We treat strict overlap: start <= date < end
    return checkTime >= range.start.getTime() && checkTime < range.end.getTime();
  });
};
