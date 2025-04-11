# API REST con Node.js y MongoDB Dockerizada

Este proyecto es una API REST completa construida con Node.js y Express, que utiliza MongoDB como base de datos. Toda la infraestructura está containerizada usando Docker, lo que facilita su despliegue y desarrollo en cualquier entorno.

La API proporciona endpoints para gestionar usuarios con información personal, direcciones y datos de tarjetas, todo ello almacenado de forma segura en una base de datos MongoDB containerizada.

## Características Principales

- 🐳 Completamente Dockerizada (API + MongoDB)
- 🔐 Autenticación de MongoDB configurada por defecto
- 🚀 Express.js para el manejo de rutas y middleware 
- 📄 Mongoose para modelado de datos
- 🔄 Soporte para operaciones CRUD completas
- 🌐 Arquitectura RESTful

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

## Guía de Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd api-node-mongo
   ```

2. **Configurar Variables de Entorno**
   - Copia el archivo de ejemplo:
     ```bash
     cp .env.example .env
     ```
   - Edita el archivo `.env` con tus credenciales:
     ```
     MONGO_URI=mongodb://devfs031023:access123@localhost:27017/usersBoot?authSource=admin
     ```

3. **Iniciar los Contenedores**
   ```bash
   docker-compose up -d
   ```
   Este comando iniciará dos contenedores:
   - API Node.js (puerto 3000)
   - MongoDB (puerto 27017)

4. **Verificar la Instalación**
   - API: http://localhost:3000/items
   - La base de datos MongoDB estará accesible en localhost:27017

## Base de Datos

Este proyecto incluye una carpeta `dump` que contiene la base de datos MongoDB necesaria para el funcionamiento de la API.

### Importar la Base de Datos

1. **Después de clonar el repositorio**, la carpeta `dump` estará disponible en la raíz del proyecto.

2. **Iniciar los contenedores**
   ```bash
   docker-compose up -d
   ```

3. **Importar la base de datos**
   ```bash
   docker exec -it mongo_container mongorestore --username devfs031023 --password access123 --authenticationDatabase admin /dump
   ```

4. **Verificar la importación**
   ```bash
   # Conectarse a MongoDB
   docker exec -it mongo_container mongosh --username devfs031023 --password access123 --authenticationDatabase admin

   # Dentro de la consola de MongoDB:
   use usersBoot
   db.usersObs.find().limit(1)
   ```

Si ves los datos de un usuario, la importación fue exitosa.

## Estructura del Proyecto

```
api-node-mongo/
├── app.js                # Punto de entrada de la aplicación
├── docker-compose.yml    # Configuración de Docker
├── Dockerfile           # Instrucciones de construcción del contenedor
├── controllers/        # Lógica de negocio
├── models/            # Esquemas de Mongoose
└── routes/            # Definición de rutas
```

## Endpoints Disponibles

| Método | Ruta           | Descripción                    |
|--------|---------------|--------------------------------|
| GET    | /items        | Obtener todos los usuarios     |
| GET    | /items/search | Buscar usuarios por parámetros |
| PUT    | /items        | Crear o actualizar usuario     |
| DELETE | /items        | Eliminar usuarios              |

## Solución de Problemas Comunes

### Error de Conexión a MongoDB
Si encuentras errores de conexión a MongoDB:
1. Verifica que los contenedores estén corriendo:
   ```bash
   docker ps
   ```
2. Asegúrate de que las credenciales en .env coincidan con las del docker-compose.yml
3. Espera ~30 segundos después de iniciar los contenedores para que MongoDB esté listo

### Error: EADDRINUSE
Si el puerto 3000 está ocupado:
1. Cambia el puerto en docker-compose.yml:
   ```yaml
   ports:
     - "3001:3000"  # Cambia 3000 por otro puerto
   ```
2. Reinicia los contenedores:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Problemas con Permisos de Docker
En Linux/macOS, si tienes problemas de permisos:
```bash
sudo chmod 666 /var/run/docker.sock
```

## Comandos Útiles

```bash
# Ver logs de la API
docker-compose logs api

# Ver logs de MongoDB
docker-compose logs mongodb

# Reiniciar contenedores
docker-compose restart

# Detener contenedores
docker-compose down

# Reconstruir contenedores
docker-compose up -d --build
```

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


> Esta es una mejora del README para prueba de Pull Request.

