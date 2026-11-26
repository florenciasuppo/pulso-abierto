Pulso Abierto — Consulta de criptomonedas

Descripción

Aplicación web desarrollada en HTML5, CSS y TypeScript con Vite que permite consultar los precios actualizados en dólares estadounidenses (USD) de Bitcoin, Ethereum y Solana en tiempo real.

API utilizada

Nombre: CoinGecko API

Endpoint consultado: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd

Método: GET

Parámetros:

ids: controla qué criptomonedas se consultan (bitcoin,ethereum,solana).

vs_currencies: controla en qué moneda se expresa el precio (usd).

Propiedades de la respuesta que se utilizan: bitcoin.usd, ethereum.usd y solana.usd.

Instalación

Desde la carpeta del proyecto, ejecuta:

npm install


Esto instala todas las dependencias necesarias a partir de package.json.

Ejecución

Para iniciar el servidor de desarrollo:

npm run dev


La aplicación queda disponible en http://localhost:5173/.

Otros comandos disponibles:

npm run typecheck # revisa los tipos de TypeScript sin emitir archivos
npm run build     # genera la versión compilada para producción
npm run preview   # previsualiza la versión de producción


Estados de la interfaz

La aplicación contempla los siguientes estados: inicial, carga, resultado, vacío y error.

Capturas

Las capturas de pantalla (vista móvil, vista de escritorio y los estados de la interfaz) se encuentran en la carpeta /capturas incluida en el archivo comprimido .zip de la entrega.