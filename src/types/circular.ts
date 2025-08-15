export type Circular = {
  id: string;          // stable-ish hash or source id
  title: string;
  date: string;        // ISO 8601 (yyyy-mm-dd or full ISO)
  exchange: "NSE" | "BSE" | "MCX";
  url: string;         // direct link to source circular
  category?: string;   // optional (e.g., "Corporate Actions")
};

export type CircularFilters = {
  exchange: "all" | "NSE" | "BSE" | "MCX";
  query: string;
  exDateOnly: boolean;
};