import sharp from 'sharp';import fs from 'node:fs';import path from 'node:path';
const icon='src/assets/brand/lunar-logo-icon.svg';fs.copyFileSync(icon,'public/favicon.svg');await sharp(icon).resize(32,32).png().toFile('public/favicon-32.png');await sharp(icon).resize(180,180).png().toFile('public/apple-touch-icon.png');
