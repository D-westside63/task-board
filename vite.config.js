import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages のプロジェクトサイト（https://<user>.github.io/task-board/）で配信するため
  base: '/task-board/',
})
