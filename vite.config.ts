import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.svg'],
            manifest: {
                name: 'Fee Management',
                short_name: 'FeeM',
                description: 'Fee Management Application',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/logo150.png',
                        sizes: '150x150',
                        type: 'image/png',
                    },
                    {
                        src: '/logo300.png',
                        sizes: '300x300',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
