Proyecto Fullstack: Costos Indirectos
Este proyecto está dividido en dos carpetas principales:
- backend/ → API GraphQL con Node.js, Apollo Server, Prisma y MySQL.
- frontend/ → Aplicación React con Apollo Client y Material React Table.
📦 Requisitos previos
- Node.js v18+
- npm o yarn
- Docker (opcional, si usas docker-compose para la DB)
- Una base de datos MySQL en local o en la nube.
⚙️ Backend
1. Variables de entorno
En la carpeta backend/ crea un archivo .env con el siguiente contenido:
DATABASE_URL="mysql://user:password@localhost:3306/mi_basededatos"
2. Instalar dependencias
cd backend
npm install
3. Generar Prisma Client
npx prisma generate
4. Ejecutar migraciones
npx prisma migrate dev --name init
5. Correr el servidor
npm run dev

El backend estará disponible en: http://localhost:3000/graphql
🖥️ Frontend
1. Instalar dependencias
cd frontend
npm install
2. Configurar variables de entorno
Crea un archivo .env en frontend/ con el siguiente contenido:
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
3. Ejecutar la app
npm run dev

La app estará disponible en: http://localhost:5173
📂 Estructura del proyecto

proyecto/
├── backend/        # API GraphQL con Node + Prisma
│   ├── prisma/     # Esquema y migraciones
│   ├── src/        # Código fuente del servidor
│   └── package.json
│
├── frontend/       # React + Apollo Client
│   ├── src/        # Código fuente del frontend
│   └── package.json
│
└── README.md

🚀 Scripts útiles
Backend
- npm run dev → Inicia el servidor en modo desarrollo.
- npx prisma studio → Abre Prisma Studio para explorar la DB.
- npx prisma migrate dev → Ejecuta migraciones.
Frontend
- npm run dev → Inicia el servidor de desarrollo.
- npm run build → Compila la app para producción.
🧑‍💻 Flujo de desarrollo
1. Corre el backend (npm run dev en /backend).
2. Corre el frontend (npm run dev en /frontend).
3. Abre la app en el navegador y comienza a usarla.
4. Usa Apollo Client DevTools o GraphQL Playground para probar queries/mutations.
✨ Notas
- Si quieres levantar todo con Docker, puedes configurar un docker-compose.yml para la DB y el backend.
- Prisma genera automáticamente los tipos de TS según el schema de tu base de datos.
- El frontend se conecta al backend a través de Apollo Client.
