export const REPLACE_DIACRITICS = (text: any) => text ? text.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '') : '';