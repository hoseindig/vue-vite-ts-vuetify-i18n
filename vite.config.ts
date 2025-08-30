import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
        vuetify({ autoImport: true }), // ✅ پشتیبانی Vuetify
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/main.scss";`,
      },
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: "src/main.js",
      name: "MyWidget",
      fileName: "widget",
      formats: ["iife"],
    },
    minify: false,
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});