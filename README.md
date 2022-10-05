# reserve-house-basic-service

build docker
docker build . -t acrwebdev/reserve-house-basic-service:0.0.1

docker push
docker push acrwebdev/reserve-house-basic-service:0.0.1

docker pull
docker pull acrwebdev/reserve-house-basic-service:0.0.1

run docker
docker run -p 18000:18000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=18000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=34.80.78.75 --restart=always --name=reserve-house-basic-service -d acrwebdev/reserve-house-basic-service:0.0.1
