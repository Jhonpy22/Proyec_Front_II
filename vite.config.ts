import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

    server: {
    host: true,        // permite accesos externos
    port: 5173,        // puerto del frontend
    strictPort: true,  // evita que cambie el puerto
  }
})
