import { Circular } from "@/types/circular";
import { normalizeDate, makeId, onlyExDate } from "@/lib/normalize";

export { onlyExDate } from "@/lib/normalize";

// Cache implementation
class SimpleCache {
  private cache = new Map<string, { data: any; expires: number }>();
  private ttl = 3 * 60 * 1000; // 3 minutes

  get(key: string) {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      expires: Date.now() + this.ttl
    });
  }
}

const cache = new SimpleCache();

// Mock data generators for each exchange
const generateNSECirculars = (): Circular[] => [
  {
    id: makeId("Ex-Date for Dividend Payment - RELIANCE", "2024-08-15T10:30:00Z", "NSE"),
    title: "Ex-Date for Dividend Payment - RELIANCE",
    date: "2024-08-15T10:30:00Z",
    exchange: "NSE",
    url: "https://www.nseindia.com/circular/reliance-dividend-2024",
    category: "Corporate Action"
  },
  {
    id: makeId("New Margin Requirements for F&O Segment", "2024-08-14T14:15:00Z", "NSE"),
    title: "New Margin Requirements for F&O Segment",
    date: "2024-08-14T14:15:00Z",
    exchange: "NSE",
    url: "https://www.nseindia.com/circular/fo-margin-2024",
    category: "Regulatory"
  },
  {
    id: makeId("System Maintenance Notice", "2024-08-14T09:00:00Z", "NSE"),
    title: "System Maintenance Notice - Weekend Downtime",
    date: "2024-08-14T09:00:00Z",
    exchange: "NSE",
    url: "https://www.nseindia.com/circular/system-maintenance",
    category: "Market Update"
  },
  {
    id: makeId("Record Date for Bonus Issue - TCS", "2024-08-13T16:45:00Z", "NSE"),
    title: "Record Date for Bonus Issue - TCS (1:1 Ratio)",
    date: "2024-08-13T16:45:00Z",
    exchange: "NSE",
    url: "https://www.nseindia.com/circular/tcs-bonus-2024",
    category: "Corporate Action"
  }
];

const generateBSECirculars = (): Circular[] => [
  {
    id: makeId("Trading Holiday on Account of Independence Day", "2024-08-14T16:00:00Z", "BSE"),
    title: "Trading Holiday on Account of Independence Day",
    date: "2024-08-14T16:00:00Z",
    exchange: "BSE",
    url: "https://www.bseindia.com/circular/independence-day-2024",
    category: "Market Update"
  },
  {
    id: makeId("Book Closure for Rights Issue - TATA STEEL", "2024-08-13T15:30:00Z", "BSE"),
    title: "Book Closure for Rights Issue - TATA STEEL (1:20 Ratio)",
    date: "2024-08-13T15:30:00Z",
    exchange: "BSE",
    url: "https://www.bseindia.com/circular/tata-steel-rights-2024",
    category: "Corporate Action"
  },
  {
    id: makeId("Updated KYC Guidelines", "2024-08-13T11:20:00Z", "BSE"),
    title: "Updated KYC Guidelines for Market Participants",
    date: "2024-08-13T11:20:00Z",
    exchange: "BSE",
    url: "https://www.bseindia.com/circular/kyc-guidelines-2024",
    category: "Compliance"
  },
  {
    id: makeId("Ex-Date for Special Dividend - HDFC Bank", "2024-08-12T14:30:00Z", "BSE"),
    title: "Ex-Date for Special Dividend - HDFC Bank",
    date: "2024-08-12T14:30:00Z",
    exchange: "BSE",
    url: "https://www.bseindia.com/circular/hdfc-special-dividend",
    category: "Corporate Action"
  }
];

const generateMCXCirculars = (): Circular[] => [
  {
    id: makeId("Gold Futures Contract Specifications Update", "2024-08-14T11:45:00Z", "MCX"),
    title: "Gold Futures Contract Specifications Update",
    date: "2024-08-14T11:45:00Z",
    exchange: "MCX",
    url: "https://www.mcxindia.com/circular/gold-futures-update",
    category: "Trading"
  },
  {
    id: makeId("Silver Options Contract Launch", "2024-08-13T10:15:00Z", "MCX"),
    title: "Launch of Silver Options Contracts",
    date: "2024-08-13T10:15:00Z",
    exchange: "MCX",
    url: "https://www.mcxindia.com/circular/silver-options-launch",
    category: "Trading"
  },
  {
    id: makeId("Crude Oil Trading Hours Extension", "2024-08-12T16:30:00Z", "MCX"),
    title: "Extension of Crude Oil Trading Hours",
    date: "2024-08-12T16:30:00Z",
    exchange: "MCX",
    url: "https://www.mcxindia.com/circular/crude-oil-hours",
    category: "Market Update"
  }
];

// API functions
export const fetchNSECirculars = async (): Promise<Circular[]> => {
  const cached = cache.get('nse:latest');
  if (cached) return cached;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const data = generateNSECirculars();
  cache.set('nse:latest', data);
  return data;
};

export const fetchBSECirculars = async (): Promise<Circular[]> => {
  const cached = cache.get('bse:latest');
  if (cached) return cached;
  
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
  
  const data = generateBSECirculars();
  cache.set('bse:latest', data);
  return data;
};

export const fetchMCXCirculars = async (): Promise<Circular[]> => {
  const cached = cache.get('mcx:latest');
  if (cached) return cached;
  
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 900));
  
  const data = generateMCXCirculars();
  cache.set('mcx:latest', data);
  return data;
};

export const fetchAllCirculars = async (filters?: {
  exchange?: "all" | "NSE" | "BSE" | "MCX";
  query?: string;
  exDateOnly?: boolean;
}): Promise<Circular[]> => {
  const { exchange = "all", query = "", exDateOnly = false } = filters || {};
  
  const cacheKey = `all:${exchange}:${query}:${exDateOnly}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let allData: Circular[] = [];
  
  try {
    if (exchange === "all" || exchange === "NSE") {
      const nseData = await fetchNSECirculars();
      allData = allData.concat(nseData);
    }
    if (exchange === "all" || exchange === "BSE") {
      const bseData = await fetchBSECirculars();
      allData = allData.concat(bseData);
    }
    if (exchange === "all" || exchange === "MCX") {
      const mcxData = await fetchMCXCirculars();
      allData = allData.concat(mcxData);
    }
  } catch (error) {
    console.error('Error fetching circulars:', error);
  }

  // Apply filters
  let filtered = allData;
  
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(circular =>
      circular.title.toLowerCase().includes(searchTerm) ||
      (circular.category && circular.category.toLowerCase().includes(searchTerm))
    );
  }
  
  if (exDateOnly) {
    filtered = filtered.filter(circular => onlyExDate(circular.title));
  }

  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const result = filtered.slice(0, 300);
  cache.set(cacheKey, result);
  return result;
};

// CSV Export utility
export const exportCircularsToCSV = (circulars: Circular[], filename = 'circulars.csv') => {
  const headers = ['ID', 'Title', 'Date', 'Exchange', 'Category', 'URL'];
  const csvContent = [
    headers.join(','),
    ...circulars.map(circular => [
      `"${circular.id}"`,
      `"${circular.title.replace(/"/g, '""')}"`,
      `"${circular.date}"`,
      `"${circular.exchange}"`,
      `"${circular.category || ''}"`,
      `"${circular.url}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};