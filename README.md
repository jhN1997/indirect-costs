# 🚀 Proyecto Fullstack

## 📂 Estructura del proyecto

proyecto/
│── backend/ # API GraphQL con Node + Prisma  
│ │── prisma/ # Esquema y migraciones  
│ │── src/ # Código fuente del servidor  
│ │── package.json  
│
│── frontend/ # React + Apollo Client  
│ │── src/ # Código fuente del frontend  
│ │── package.json  
│
│── docker-compose.yml # Configuración de contenedor MariaDB  
│── README.md  
Este proyecto está dividido en dos carpetas principales:

- backend/ → API GraphQL con Node.js, Apollo Server, Prisma y MySQL.
- frontend/ → Aplicación React con Apollo Client y Material React Table.

## 📦 Requisitos previos

- Node.js v18+
- npm o yarn
- Docker (opcional, si usas docker-compose para la DB)
- Una base de datos MySQL en local o en la nube.

## ⚙️ Backend

- cd backend

1. Instalar dependencias
   npm install
2. Levantar base de datos (Docker)
   docker-compose up -d
3. Generar Prisma Client
   npx prisma generate
4. Ejecutar migraciones
   npx prisma migrate dev --name init
5. Correr el servidor
   npm run dev

El backend estará disponible en: http://localhost:3000/graphql

## Volver a la raíz:

- cd ..

## 🖥️ Frontend

- cd frontend

1. Instalar dependencias
   npm install
2. Ejecutar la app
   npm run dev

La app estará disponible en: http://localhost:5173

## 🚀 Scripts útiles

Backend

- npm run dev → Inicia el servidor en modo desarrollo.
- npx prisma studio → Abre Prisma Studio para explorar la DB.
- npx prisma migrate dev → Ejecuta migraciones.

Frontend

- npm run dev → Inicia el servidor de desarrollo.
- npm run build → Compila la app para producción.

## 🧑‍💻 Flujo de desarrollo

1. Corre el backend (npm run dev en /backend).
2. Corre el frontend (npm run dev en /frontend).
3. Abre la app en el navegador y comienza a usarla.
4. Usa Apollo Client DevTools o GraphQL Playground para probar queries/mutations.
