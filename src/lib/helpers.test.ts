import { describe,it,expect } from 'vitest';
import {transition} from './model-stage';
import {validAssetKey} from './r2';
import {waLink} from './whatsapp';
describe('pure site helpers',()=>{it('moves stage through failure and retry',()=>{expect(transition('loading','TIMEOUT')).toBe('failed');expect(transition('failed','RETRY')).toBe('armed')});it('keeps slow connections manual',()=>{expect(transition('idle','CONSTRAINED')).toBe('constrained')});it('accepts flat asset keys only',()=>{expect(validAssetKey('chair.glb')).toBe(true);expect(validAssetKey('../chair.glb')).toBe(false)});it('encodes WhatsApp messages',()=>{expect(waLink('halo LunAR')).toContain('halo%20LunAR')})});
