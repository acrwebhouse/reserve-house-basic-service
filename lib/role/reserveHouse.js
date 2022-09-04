const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.reserveHouseCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const reserveHouseDoc = {
    client:'',
    host:'',
    houseId:'',
    state: 0,
    type:0
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

function addReserveHouse(client,host,houseId,state,type,callback) {
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
    mongoDB.insert(collectionName, doc, callback);
}

function editReserveHouse(id,client,host,houseId,state,type, callback) {
    if (utilsValue.isValid(id) && id.length == 24){
        const updateData = {
            client,
            host,
            houseId,
            state,
            type,
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

// function removeHouse(ids,callback){
//     let isValid = true;
//     for(let i = 0;i<ids.length;i++){
//         if(ids[i].length!=24){
//             isValid = false;
//         }
//     }
//     if(isValid == true){
//         const objectIds = []
//         for(let i = 0 ;i<ids.length;i++ ){
//             objectIds.push(ObjectId(ids[i]))
//         }
//         const searchDoc = {
//             '_id': {$in : objectIds}
//         }
//         const updateData = {
//             isDelete:true,
//             updateTime: new Date()
//         }
//         mongoDB.updateMany(collectionName, searchDoc, updateData, (result,data)=>{
//             if(result && data.nModified>0){
//                 callback(true,data)
//             }else{
//                 callback(false,data)
//             }
//         });
//     }else{
//         callback(false, 'ids is invalid')
//     }
// }

// function editHouse(id,name,city,area,owner,address,houseNumber,floor,room,price,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark, callback) {
    
//     const queryDoc = {
//         _id:{$ne:ObjectId(id)},
//         address,
//         houseNumber,
//         floor,
//         room,
//         'isDelete' : false
//     }
//     mongoDB.queryFindOne(collectionName, queryDoc, (result,data)=>{
//         if(result){
//             if(utilsValue.isValid(data)){
//                 callback(false,'house address is exist')
//             }else{
//                 if (id.length == 24){
//                     const updateData = {
//                         name,
//                         city,
//                         area,
//                         owner:ObjectId(owner),
//                         address,
//                         houseNumber,
//                         floor,
//                         room,
//                         price,
//                         config,
//                         ping,
//                         parking,
//                         traffic,
//                         life,
//                         educate,
//                         saleType,
//                         saleInfo,
//                         photo,
//                         annex,
//                         remark,
//                         updateTime: new Date()
//                     }
//                     const searchDoc = {
//                         '_id': ObjectId(id)
//                     }
//                     mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
//                         if(result && data.nModified>0){
//                             callback(true,data)
//                         }else{
//                             callback(false,data)
//                         }
//                     });
            
//                 }else{
//                     callback(false, 'id or accout invalid')
//                 }
//             }
//         }else{
//             callback(false,'db query error')
//         }
//     })
    
    
    
    
// }

// function getHouseList(queryInfos,skip,limit,sort,callback){
//     const maxLimit = 300

//     if (!utilsValue.isNumber(skip)){
//         skip = 0;
//     }
//     if (!utilsValue.isNumber(limit) || limit>maxLimit){
//         limit = maxLimit;
//     }
//     if (!utilsValue.isValid(sort)){
//         sort = {updateTime:-1}
//     }

//     mongoDB.queryFindAll(collectionName, queryInfos , skip, limit, sort ,(result, msg) => {
//         callback(result, msg);
//     })
// }

// function getHouse(id,isDelete,callback){
//     if(isDelete == 'true'){
//         isDelete = true
//     }
//     if(isDelete == 'false'){
//         isDelete = false
//     }
//     const queryInfo = {
//         isDelete,
//         '_id':ObjectId(id)
//     }
//     mongoDB.queryFindOne(collectionName, queryInfo, (result, msg) => {
//         callback(result, msg);
//     })
// }


exports.addReserveHouse = addReserveHouse
exports.editReserveHouse = editReserveHouse
// exports.removeHouse = removeHouse
// exports.getHouseList = getHouseList
// exports.getHouse = getHouse