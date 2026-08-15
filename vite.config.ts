import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type UserConfig} from 'vite';

// Lightning CSS target encoding is (major << 16) | (minor << 8).
// Safari/iOS 15.4 is the real floor for this site: it is the first version with CSS
// cascade layers (@layer), which Tailwind v4 wraps ALL of its output in. On a browser
// without @layer the entire Tailwind stylesheet is skipped as an unknown at-rule, so the
// page renders completely unstyled. Nothing in the build can down-level that away.
const SAFARI_15_4 = (15 << 16) | (4 << 8);

// The explicit UserConfig return type keeps `css.transformer` from widening to `string`,
// which `npm run lint` (tsc --noEmit) rejects.
export default defineConfig((): UserConfig => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Vite 6 defaults to `baseline-widely-available`, i.e. Safari 16. That shipped JS
      // that older iPhones could not even parse, so they showed a blank white page rather
      // than a degraded one. Pin the floor explicitly instead of inheriting the default.
      target: ['es2020', 'safari15', 'chrome87', 'firefox78', 'edge88'],
    },
    css: {
      // esbuild (Vite's default CSS handler) does not touch color functions, so Tailwind's
      // oklch() colours shipped as-is and were invalid below Safari 15.4. Lightning CSS
      // converts them to rgb() for the target below. color-mix() survives, but Tailwind
      // already guards every use behind @supports, so opacity-modified utilities degrade to
      // full opacity rather than breaking.
      transformer: 'lightningcss',
      lightningcss: {
        targets: {safari: SAFARI_15_4, ios_saf: SAFARI_15_4},
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
