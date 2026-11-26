# Pulso Abierto — Consulta de criptomonedas

Aplicación web desarrollada en React y TypeScript con Vite que permite consultar los precios actualizados en dólares estadounidenses (USD) de Bitcoin, Ethereum y Solana, acceder al detalle de cada activo, filtrar resultados mediante un formulario controlado y administrar favoritos persistentes.

## Tecnologías utilizadas

* React 19 y TypeScript
* Vite
* React Router DOM (navegación entre listado y vista de detalle)
* Zustand (manejo de estado global y persistencia en `localStorage`)
* Zod (validación del formulario de búsqueda)
* Vitest y React Testing Library (pruebas automatizadas)

## API y variables de entorno

La aplicación consume la API pública de **CoinGecko** mediante solicitudes `GET`.

Para configurar el endpoint base, el proyecto utiliza la siguiente variable de entorno (referenciada en `.env.example`):

* `VITE_API_BASE_URL`: URL base de la API (`https://api.coingecko.com/api/v3`).

Para ejecutar localmente, crear un archivo `.env` en la raíz del proyecto a partir de `.env.example`. En Vercel, esta misma variable debe configurarse en los ajustes del proyecto antes de desplegar.

## Instalación y ejecución local

1. Clonar el repositorio e instalar las dependencias:
```bash
npm install
