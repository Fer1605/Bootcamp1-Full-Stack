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

## Configuración de la Base de Datos

La API incluye una base de datos preconfigurada `usersBoot` que necesitarás importar para tener los datos iniciales.

1. **Copiar archivos de la base de datos**
   ```bash
   # Crear directorio para los datos
   mkdir -p mongodb_data

   # Copiar archivos de la base de datos
   cp -r dump/usersBoot/* mongodb_data/
   ```

2. **Modificar docker-compose.yml**
   Asegúrate de que tu archivo `docker-compose.yml` tenga el volumen configurado correctamente:
   ```yaml
   services:
     mongodb:
       volumes:
         - ./mongodb_data:/data/db
         - ./dump:/docker-entrypoint-initdb.d
   ```

3. **Importar la base de datos**
   Una vez que los contenedores estén corriendo:
   ```bash
   # Acceder al contenedor de MongoDB
   docker exec -it mongo_container bash

   # Importar la base de datos (dentro del contenedor)
   mongorestore --username devfs031023 --password access123 --authenticationDatabase admin --db usersBoot /docker-entrypoint-initdb.d/usersBoot/

   # Salir del contenedor
   exit
   ```

4. **Verificar la importación**
   ```bash
   # Conectarse a MongoDB y verificar los datos
   docker exec -it mongo_container mongosh --username devfs031023 --password access123 --authenticationDatabase admin
   
   # En la consola de MongoDB:
   use usersBoot
   db.usersObs.find().limit(1)
   ```

Si ves un documento de usuario con campos como `first_name`, `last_name`, etc., la importación fue exitosa.

### Estructura de la Base de Datos

La colección `usersObs` contiene documentos con la siguiente estructura:
```json
{
  "first_name": String,
  "last_name": String,
  "email": String,
  "gender": String,
  "address": {
    "city": String,
    "state": String,
    "country": String,
    "country_code": String
  },
  "card": {
    "card_number": String,
    "card_type": String,
    "currency_code": String,
    "balance": String
  },
  "married_status": Boolean
}
```

### Solución de Problemas con la Base de Datos

Si encuentras problemas al importar la base de datos:

1. **Error de permisos**
   ```bash
   # Dar permisos correctos a la carpeta de datos
   chmod -R 777 mongodb_data
   ```

2. **Error de autenticación**
   - Verifica que las credenciales en el comando mongorestore coincidan con las del docker-compose.yml
   - Asegúrate de usar --authenticationDatabase admin

3. **Base de datos no aparece**
   ```bash
   # Reiniciar el contenedor de MongoDB
   docker-compose restart mongodb
   
   # Verificar logs
   docker-compose logs mongodb
   ```

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

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
