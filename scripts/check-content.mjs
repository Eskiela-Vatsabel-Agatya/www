import fs from 'node:fs';import path from 'node:path';
const bad=/(?:Rp\s?\d|\d\s?%|juta|ribu|gratis|murah|terbukti|terbaik|konversi\s*\d|lunar\.id|@lunarcreativa\.com|\.r2\.dev|pages\.dev)/i;
function walk(p){for(const x of fs.readdirSync(p,{withFileTypes:true})){const f=path.join(p,x.name);if(x.isDirectory())walk(f);else if(/\.(astro|ts|tsx|html|js)$/.test(x.name)&&!f.endsWith('QrPopover.astro')){let s=fs.readFileSync(f,'utf8').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<script[\s\S]*?<\/script>/gi,'');if(bad.test(s))throw Error(`Prohibited content in ${f}`);if(s.includes('VERIFY'))console.log(`VERIFY: ${f}`)}}}
walk('src');
