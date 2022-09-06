const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.reserveHouseCollection;
const houseCollectionName = config.mongoDBCollection.houseCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const reserveHouseDoc = {
    client:'',
    host:'',
    houseId:'',
    state: 0,
    type:0,
    clientName:'',
    clientPhone:'',
    // createTime:
    // updateTime:
}

function newReserveHouseDocDoc(){
    const doc = JSON.parse(JSON.stringify(reserveHouseDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function addReserveHouse(client,host,houseId,state,type,clientName,clientPhone,callback) {
    const doc = newReserveHouseDocDoc()
    if(utilsValue.isValid(client)){
        doc.client = ObjectId(client)
    }
    if(utilsValue.isValid(host)){
        doc.host = ObjectId(host)
    }
    if(utilsValue.isValid(houseId)){
        doc.houseId = ObjectId(houseId)
    }
    if(utilsValue.isNumber(state)){
        doc.state = state
    }
    if(utilsValue.isNumber(type)){
        doc.type = type
    }
    if(utilsValue.isValid(clientName)){
        doc.clientName = clientName
    }
    if(utilsValue.isValid(clientPhone)){
        doc.clientPhone = clientPhone
    }
    mongoDB.insert(collectionName, doc, callback);
}

function editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone, callback) {
    if (utilsValue.isValid(id) && id.length == 24){
        const updateData = {
            client,
            host,
            houseId,
            state,
            type,
            clientName,
            clientPhone,
            updateTime: new Date()
        }
        const searchDoc = {
            '_id': ObjectId(id)
        }

        mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                data.updateData=updateData
                data.updateData._id = id
                callback(true,data)
            }else{
                callback(false,data)
            }
        });

    }else{
        callback(false, 'id or accout invalid')
    }
}

function removeReserveHouse(ids,callback){
    let isValid = true;
    for(let i = 0;i<ids.length;i++){
        if(ids[i].length!=24){
            isValid = false;
        }
    }
    if(isValid == true){
        const objectIds = []
        for(let i = 0 ;i<ids.length;i++ ){
            objectIds.push(ObjectId(ids[i]))
        }
        const searchDoc = {
            '_id': {$in : objectIds}
        }

        mongoDB.remove(collectionName, searchDoc, (result,data)=>{
            if(result){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });
    }else{
        callback(false, 'ids is invalid')
    }
}

function getReserveHouse(id,callback){
    const lookup =
    {
      from: houseCollectionName,
      localField : 'houseId',
      foreignField : '_id',
      as: 'houseData',
    }

    const match = {
        '_id':ObjectId(id)
      }

    mongoDB.queryOneJoinCollection(collectionName,lookup,match, (result, msg) => {
        callback(result, msg);
    })
}

function getReserveHouses(host,state,type,skip,limit,sort,callback){

    const lookup =
    {
      from: houseCollectionName,
      localField : 'houseId',
      foreignField : '_id',
      as: 'houseData',
    }

    const match = {
        'state':state,
        'type':type,
    }

    if(utilsValue.isValid(host) && host.length == 24){
        match.host = ObjectId(host)
        mongoDB.queryJoinCollectionList(collectionName,lookup,match,skip,limit,sort , (result, msg) => {
            callback(result, msg);
        })
    }else{
        callback(false,'host id is not isValid')
    }
}



exports.addReserveHouse = addReserveHouse
exports.editReserveHouse = editReserveHouse
exports.removeReserveHouse = removeReserveHouse
exports.getReserveHouses = getReserveHouses
exports.getReserveHouse = getReserveHouse