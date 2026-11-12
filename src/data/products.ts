export type Product = { slug:string; name:string; category:string; description:string; photo?:string; model?:{glb:string;usdz:string}; arPlacement?:'floor' };
// Catalog follows the seven confirmed rows in docs/company.md. The legacy data.js has a different nine-row set; unlisted bowl variants are intentionally excluded.
export const products: Product[] = [
 {slug:'pouch-kanvas-miniso',name:'Pouch Kanvas Miniso',category:'Pouch',description:'Pouch kanvas dari katalog interaktif LunAR untuk Grizelle Souvenir.',photo:'/images/pouch-kanvas-miniso.webp',model:{glb:'A003.glb',usdz:'A003.usdz'}},
 {slug:'kursi-gitar',name:'Kursi Gitar',category:'Kursi',description:'Kursi Gitar menjadi awal eksplorasi pengalaman AR untuk furnitur.',model:{glb:'guitar_chair_4.glb',usdz:'guitar chair 4.usdz'},arPlacement:'floor'},
 {slug:'pouch-prada-metalik',name:'Pouch Prada Metalik',category:'Pouch',description:'Pouch metalik dari katalog interaktif LunAR untuk Grizelle Souvenir.',photo:'/images/pouch-prada-metalik.webp',model:{glb:'A001.glb',usdz:'A001.usdz'}},
 {slug:'tumbler-kaca-doff',name:'Tumbler Kaca Doff',category:'Tumbler',description:'Tumbler kaca doff dari katalog interaktif LunAR untuk Grizelle Souvenir.',photo:'/images/tumbler-kaca-doff.webp',model:{glb:'B001.glb',usdz:'B001.usdz'}},
 {slug:'gelas-kaca-coffee-belt',name:'Gelas Kaca Coffee Belt',category:'Gelas',description:'Gelas kaca dari katalog interaktif LunAR untuk Grizelle Souvenir.',photo:'/images/gelas-coffee-belt.webp',model:{glb:'D001-optimized.glb',usdz:'D001-reduced.usdz'}},
 {slug:'handsoap-pump',name:'Handsoap Pump',category:'Perawatan diri',description:'Handsoap pump dari katalog interaktif LunAR untuk Grizelle Souvenir.',photo:'/images/handsoap-pump.webp',model:{glb:'I001.glb',usdz:'I001.usdz'}},
 {slug:'totebag-blacu-kanvas-lipat',name:'Totebag Blacu Kanvas Lipat',category:'Totebag',description:'Totebag blacu dari katalog interaktif LunAR untuk Grizelle Souvenir.',photo:'/images/totebag-blacu-kanvas.webp',model:{glb:'F001.glb',usdz:'F001.usdz'}}
];
