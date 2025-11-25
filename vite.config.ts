import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html' //пример
import { viteSingleFile } from 'vite-plugin-singlefile'
export default defineConfig({
  plugins: [
    viteSingleFile(),
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
    }),
  ],
  build: {
    // Настройки для сборки, чтобы сжать JS и CSS
    rollupOptions: {
      output: {
        // Здесь можно настроить сжатие, если это необходимо
      },
    },
  },
})
