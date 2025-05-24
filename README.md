# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Estructura sugerida
- `src/assets/`: Archivos estáticos (imágenes, fuentes, etc.)
- `src/components/`: Componentes reutilizables
- `src/pages/`: Vistas principales del sitio
- `src/routes.jsx`: Definición de rutas de la app

## Ejemplo de uso de rutas
El archivo `src/routes.jsx` centraliza la configuración de rutas usando `react-router-dom`.

## Scripts
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila la app para producción
- `npm run preview`: Previsualiza la app compilada

Reemplaza los archivos de ejemplo según tus necesidades.
