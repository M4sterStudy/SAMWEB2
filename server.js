// server.js

const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuración del proxy
const apiProxy = createProxyMiddleware({
  target: 'http://localhost:3000', // La URL a la que se redirigirán las solicitudes
  changeOrigin: true, // Cambia el encabezado de host a la URL de destino
  pathRewrite: {
    '^/api': '', // Elimina el prefijo '/api' de la URL de la solicitud
  },
});

// Usa el proxy para todas las solicitudes que comiencen con '/api'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba en tu servidor Node.js
app.get('/', (req, res) => {
  res.send('¡Servidor Node.js funcionando correctamente!');
});

// Puerto en el que escucha tu servidor Node.js
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});