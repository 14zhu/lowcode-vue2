import vue from '@vitejs/plugin-vue2'
import { join, resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({ styleId: pkg.name }),
    dts({
      include: ['**/*.ts', 'index.d.ts'],
      exclude: ['node_modules', 'dist'],
      outDir: './dist/types',
      tsconfigPath: '../../tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      fileName: '[name]',
      name: 'editor',
    },
    rollupOptions: {
      plugins: [
        visualizer({
          open: false,
          filename: 'dist/stats.html',
          gzipSize: true,
        }),
      ],
      external: ['vue', 'vue-property-decorator'],
      output: [
        {
          dir: 'dist/es',
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: join(__dirname, ''),
        },
        {
          dir: 'dist/cjs',
          format: 'cjs',
        },
      ],
    },
  },
})
