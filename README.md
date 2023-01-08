# reserve-house-basic-service

build docker
docker build . -t acrwebdev/reserve-house-basic-service

docker push
docker push acrwebdev/reserve-house-basic-service

docker pull
docker pull acrwebdev/reserve-house-basic-service:latest

run docker
docker run -p 18000:18000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=18000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.234.42.100 --env DB_URI= --restart=always --name=reserve-house-basic-service -d acrwebdev/reserve-house-basic-service
