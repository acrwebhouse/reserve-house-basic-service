const express = require('express');
const app = express();
const dataBaseInit = require("./lib/db/dataBaseInit");
const config = require('./lib/setting/config').config;
const serverPort = config.serverPort;
const mongoDBPort = config.mongoDBPort;
const mongoDBName = config.mongoDBName;
const server = require('http').createServer(app);
const serverUse=require('./lib/serverUse');
const houseRestApi = require("./lib/rest_api/house");
console.log(config)
dataBaseInit.mongoDBInit(mongoDBPort,mongoDBName);
serverUse.on(app);
houseRestApi.on(app);
server.listen(process.env.PORT||serverPort);
console.log("現在使用" + serverPort + "port");