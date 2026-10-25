import { products } from '../data/products';
export const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const visible=()=>!document.hidden&&!reduced();
const start=()=>{if(!visible())return;document.querySelectorAll('.hero').forEach(el=>el.classList.add('motion-ready'));};
if('requestIdleCallback'in window)requestIdleCallback(start,{timeout:1500});else setTimeout(start,400);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
