# Pulso Abierto — Consulta de criptomonedas

Aplicación web desarrollada en React y TypeScript con Vite que permite consultar los precios actualizados en dólares estadounidenses (USD) de Bitcoin, Ethereum y Solana, acceder al detalle de cada activo, filtrar resultados mediante un formulario controlado y administrar favoritos persistentes.

## Tecnologías utilizadas

* React 19 y TypeScript
* Vite
* React Router DOM (navegación entre listado y vista de detalle)
* Zustand (manejo de estado global y persistencia en localStorage)
* Zod (validación del formulario de búsqueda)
* Vitest y React Testing Library (pruebas automatizadas)

## API y variables de entorno

La aplicación consume la API pública de CoinGecko mediante solicitudes GET. Para configurar el endpoint base, el proyecto utiliza la variable de entorno `VITE_API_BASE_URL` (`https://api.coingecko.com/api/v3`), referenciada en `.env.example`.

Para ejecutar localmente, crear un archivo `.env` en la raíz del proyecto a partir de `.env.example`. En Vercel, esta misma variable debe configurarse como `Config` antes de desplegar.

## Instalación y ejecución local

1. Clonar el repositorio e instalar las dependencias ejecutando `npm install`.
2. Iniciar el servidor de desarrollo ejecutando `npm run dev` (disponible en `http://localhost:5173/`).

## Scripts disponibles

* `npm run dev`: Inicia el servidor local en modo desarrollo.
* `npm run test`: Ejecuta las pruebas automatizadas con Vitest.
* `npm run typecheck`: Comprueba el tipado de TypeScript sin emitir archivos.
* `npm run build`: Compila TypeScript y genera el paquete productivo en la carpeta `dist/`.
* `npm run preview`: Sirve localmente el build generado en `dist/` para su verificación previa al despliegue.

## Despliegue

Aplicación publicada en Vercel: https://pulso-abierto-mlz7m1ysv-pulso-abierto7.vercel.app/

## Mejora de mantenibilidad realizada

* **Problema identificado:** El formateo de precios en dólares (`toLocaleString()`) y de porcentajes de variación (`toFixed(2)`) se encontraba duplicado entre el componente `CryptoCard` y la página `DetailPage`.
* **Cambio realizado:** Se extrajeron las funciones puras `formatUsdPrice` y `formatPercentage` al módulo `src/utils/formatters.ts` y se reutilizaron en ambas vistas, manteniendo intactas las props y el comportamiento visual.
* **Comprobación sin regresiones:** Se revisaron las diferencias con `git diff`, se ejecutaron `npm run test` y `npm run typecheck` sin errores y se verificó manualmente en el navegador que los valores se representen sin cambios en listado y detalle.

## Verificación final

* **Pruebas ejecutadas:** Suites de componentes, páginas y servicios ejecutadas con `npm run test` (todas aprobadas).
* **Build generado correctamente:** Generado sin errores mediante `npm run build` en la carpeta `dist/`.
* **Preview comprobado:** Validado localmente con `npm run preview` (carga de datos, rutas, persistencia de favoritos, panel de red y consola sin errores).
* **Despliegue realizado:** Publicado en Vercel desde la rama `main` de GitHub, comprobando navegación interna, recarga directa en rutas de detalle, formulario y vista responsiva.
* **Fecha de verificación:** 25/11/2026