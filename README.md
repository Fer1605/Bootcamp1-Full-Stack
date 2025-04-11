# API Node MongoDB

API RESTful construida con Node.js, Express y MongoDB.

## Requisitos previos

- Node.js
- Docker y Docker Compose
- Git

## Configuración inicial

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd api-node-mongo
```

2. Configurar variables de entorno:
- Copiar el archivo de ejemplo `.env.example` a `.env`
- Modificar las credenciales en el archivo `.env` según tu configuración

3. Iniciar los contenedores con Docker Compose:
```bash
docker-compose up -d
```

4. La API estará disponible en: http://localhost:3000

## Estructura del proyecto

- `controllers/` - Lógica de negocio
- `models/` - Modelos de datos MongoDB
- `routes/` - Rutas de la API

## Variables de entorno

- `MONGO_URI`: URL de conexión a MongoDB (ver formato en .env.example)

## Endpoints disponibles

- GET / - Obtener todos los elementos
- POST / - Crear nuevo elemento
- GET /:id - Obtener elemento por ID
- PUT /:id - Actualizar elemento
- DELETE /:id - Eliminar elemento