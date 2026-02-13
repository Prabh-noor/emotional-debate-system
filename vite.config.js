import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy to https://<user>.github.io/emotional-debate-system/
// the base must match the repo name:
export default defineConfig({
  plugins: [react()],
  base: '/emotional-debate-system/',
})
