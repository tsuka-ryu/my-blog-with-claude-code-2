import { createTailwindConfig } from '@repo/ui-config/tailwind';
import type { Config } from 'tailwindcss';

const config: Config = createTailwindConfig([
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
]);

export default config;
