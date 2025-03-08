import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/skao-portfolio/',
  plugins: [react(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects', // Source file
          dest: '' // Copy to the root of the build output directory
        }
      ]
    })
  ],
  server: {
    port: 3000,
  },
  
})