import { company } from '../data/site';
export const waLink = (text:string) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
