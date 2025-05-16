// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   },
// });

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Змініть імпорт

export default defineConfig({
  plugins: [react()], // Використовуйте звичайний плагін react
});
