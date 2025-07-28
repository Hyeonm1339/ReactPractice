import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as MillionLint from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MillionLint.vite({auto:true}),react()],
})
