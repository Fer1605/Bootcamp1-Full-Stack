# Usa una imagen base oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto a la carpeta de trabajo dentro del contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todos los archivos de tu proyecto al contenedor
COPY . .

# Expón el puerto en el que tu aplicación escucha (3000 en este caso)
EXPOSE 3000

# Define el comando que se ejecutará cuando el contenedor se inicie
CMD ["node", "app.js"]
