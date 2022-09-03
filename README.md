# house-basic-service

build docker
docker build . -t acrwebdev/house-basic-service

docker push
docker push acrwebdev/house-basic-service

docker pull
docker pull acrwebdev/house-basic-service:latest

run docker
docker run -p 14000:14000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=14000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.234.42.100 --restart=always --name=house-basic-service -d acrwebdev/house-basic-service
