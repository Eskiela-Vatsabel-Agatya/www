import { ASSET_BASE } from '../data/site';
export const validAssetKey = (key:string) => /^[a-z0-9][a-z0-9._-]*\.(glb|usdz|mp4|webm)$/i.test(key) && !key.includes('..') && !key.includes('/');
export const R2 = (key:string) => { return `${ASSET_BASE}/${encodeURIComponent(key)}`; };

