const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Conexión a MongoDB dockerizado
const dbURI = process.env.MONGO_URI || 'mongodb://devfs031023:access123@localhost:27017/usersBoot?authSource=admin';

mongoose.connect(dbURI)
  .then(() => console.log('✅ Conectado a MongoDB en Docker'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
app.use('/', itemRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
