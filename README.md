
# Next.js Entries Fly App

Para correr localmente se necesita la base de datos
´´´´´´
docker-compose up -d
´´´´´
\*El -d significa **detashed**

- MongoDB URL local:
  ´´´´´´´
  mongodb://localhost:27017/entriesdb --> creado en una imagen de docker
  ´´´´´´

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos

Llamar a:
http://localhost:3000/api/seed
´´´´´´
