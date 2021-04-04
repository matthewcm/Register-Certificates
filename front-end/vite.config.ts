import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target:'http://localhost:8080',
                changeOrigin: true,
                secure:false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },

    plugins: [
        pluginRewriteAll(),
        reactRefresh(),
    ],
})
