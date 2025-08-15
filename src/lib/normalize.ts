export const normalizeDate = (s: string): string => {
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString();
  
  // try dd-mm-yyyy or dd/mm/yyyy
  const m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (m) {
    const [_, dd, mm, yyyy] = m;
    const iso = new Date(
      Number(yyyy.length === 2 ? "20" + yyyy : yyyy),
      Number(mm) - 1,
      Number(dd)
    ).toISOString();
    return iso;
  }
  return new Date().toISOString();
};

export const onlyExDate = (title: string): boolean => {
  const t = title.toLowerCase();
  return t.includes("ex-date") || 
         t.includes("ex date") || 
         t.includes("book closure") ||
         t.includes("record date") ||
         t.includes("dividend") ||
         t.includes("rights issue");
};

// Tiny stable-ish id from title+date+exchange
export const makeId = (title: string, date: string, exchange: string): string =>
  btoa(`${exchange}|${title}|${date}`).replace(/[^a-zA-Z0-9]/g, '').slice(0, 22);