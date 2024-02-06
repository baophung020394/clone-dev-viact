## Docker build

1. Docker nestjs

   docker build -t nestjs-docker:latest .

## Docker run

1. Docker nestjs
   docker run -p 3000:3000 -e DATABASE_USER=root -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e DATABASE_NAME=viact nestjs-docker:latest
   docker run -d --name mysql-container -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql:8.3.0

## Check ip docker

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_id_or_name>


## Run Nestjs
- npm install
- npm run test with default port 3000

## Run Reactjs
- npm install
- npm run start with port 4000 in env file