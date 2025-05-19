import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  corePlugins: {
    preflight: true, // vẫn giữ base styles
    container: true, // vẫn giữ container nếu cần
    utilities: false, // Tắt toàn bộ utilities
  },
})
