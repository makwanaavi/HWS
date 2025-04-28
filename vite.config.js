import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default{
  base: "/HWS/",
  plugins: [react(), tailwindcss()],
}
