# Iniciar Proyecto

Este proyecto es una aplicación websocket Node.js

## Requisitos Previos

Asegúrate de tener Node.js y npm (o yarn) instalados en tu sistema. También necesitarás una base de datos configurada y accesible.

## Configuración

1. **Clonar el Repositorio**: Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/David-Rosas/nodejs-socket
    cd nodejs-socket
    ```

2. **Instalar Dependencias**: Instala las dependencias del proyecto:

    ```bash
    npm install o npm i
    # o
    yarn install
    ```

3. **Configurar Variables de Entorno**: Modifica el archivo `.env` basado en el archivo de ejemplo `example.env`. Define las variables de entorno necesarias para la conexión a la base de datos y la configuración del servidor:

    ```plaintext
    DATABASE_NAME=""
    DATABASE_USER="root"
    DATABASE_PASSWORD="tuContraseña"
    DATABASE_HOST="localhost"
    DATABASE_PORT="3306"
   

    PORT=4001
    SERVER_ROOT_URI="http://localhost:{PORT}"
    UI_ROOT_URI="http://localhost:3000"
    URL_FRONTEND="http://localhost:8000"
    ```

    Asegúrate de configurar las variables de entorno según tu configuración específica.


4. **Iniciar la Aplicación**: Una vez configurada la base de datos y aplicadas las migraciones y los seeders, puedes iniciar la aplicación con:

    ```bash
    npm start
    # o
    yarn start
    ```

    ¡La aplicación ahora está en funcionamiento y lista para ser utilizada!

