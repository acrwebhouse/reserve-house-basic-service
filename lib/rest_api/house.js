exports.on = function(app) {
    const preRestApi = '/house';
    const house = require('../role/house');
    const utilsValue = require('../utils/value');
    const { ObjectId } = require('mongodb'); // or ObjectID 

    app.post(preRestApi + '/addHouse', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a house',
            schema: {
                name:'文山區好房子',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                houseNumber:{
                    lane:96,
                    alley:2,
                    number1:5,
                    number2:1
                },
                floor:3,
                room:"1001",
                price:6666,
                config:{
                    room:2,
                    livingRoom:1,
                    balcony:1,
                    bathroom:1,
                    buildingType:1
                },
                ping:30,
                parking:true,
                traffic:[{
                    name:'萬芳醫院站',
                    distance:20,
                    type:1
                }],
                life:[{
                    name:'景美夜市',
                    distance:200,
                    type:1
                }],
                educate:[{
                    name:'景美幼稚園',
                    distance:200,
                    type:1
                }],
                saleType:1,
                saleInfo:{
                    pet: true,
                    manager: true,
                    garbage: true,
                    managerPrice:200,
                    garbagePrice:200,
                    smoke:true,
                    cook:true,
                    typeOfRental:1
                },
                photo:['1.jpg','2.jpg'],
                annex:['1.jpg'],
                remark:'test'
            }
        }*/ 

        
        const name = req.body.name
        const city = req.body.city
        const area = req.body.area
        const owner = req.body.owner
        const address = req.body.address
        const houseNumber = req.body.houseNumber
        const floor = req.body.floor
        const room = req.body.room
        const price = req.body.price
        const config = req.body.config
        const ping = req.body.ping
        const parking = req.body.parking
        const traffic = req.body.traffic
        const life = req.body.life
        const educate = req.body.educate
        const saleType = req.body.saleType
        const saleInfo = req.body.saleInfo
        const photo = req.body.photo
        const annex = req.body.annex
        const remark = req.body.remark
        const response = {
            'status':true,
            'data':''
        }
        house.addHouse(name,city,area,owner,address,houseNumber,floor,room,price,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editHouse', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a house',
            schema: {
                id:'61ed2777f5178ce385654350',
                name:'文山區好房子',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                houseNumber:{
                    lane:96,
                    alley:2,
                    number1:5,
                    number2:1
                },
                floor:3,
                room:"1001",
                price:6666,
                config:{
                    room:2,
                    livingRoom:1,
                    balcony:1,
                    bathroom:1,
                    buildingType:1
                },
                ping:30,
                parking:true,
                traffic:[{
                    name:'萬芳醫院站',
                    distance:20,
                    type:1
                }],
                life:[{
                    name:'景美夜市',
                    distance:200,
                    type:1
                }],
                educate:[{
                    name:'景美幼稚園',
                    distance:200,
                    type:1
                }],
                saleType:1,
                saleInfo:{
                    pet: true,
                    manager: true,
                    garbage: true,
                    managerPrice:200,
                    garbagePrice:200,
                    smoke:true,
                    cook:true,
                    typeOfRental:1
                },
                photo:['1.jpg','2.jpg'],
                annex:['1.jpg'],
                remark:'test'
            }
        }*/ 

        const id = req.body.id
        const name = req.body.name
        const city = req.body.city
        const area = req.body.area
        const owner = req.body.owner
        const address = req.body.address
        const houseNumber = req.body.houseNumber
        const floor = req.body.floor
        const room = req.body.room
        const price = req.body.price
        const config = req.body.config
        const ping = req.body.ping
        const parking = req.body.parking
        const traffic = req.body.traffic
        const life = req.body.life
        const educate = req.body.educate
        const saleType = req.body.saleType
        const saleInfo = req.body.saleInfo
        const photo = req.body.photo
        const annex = req.body.annex
        const remark = req.body.remark
        const response = {
            'status':true,
            'data':''
        }
        house.editHouse(id,name,city,area,owner,address,houseNumber,floor,room,price,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeHouse', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a housees',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        house.removeHouse(ids,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getHouses', function(req, res) {
       /*
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        */ 
        let isDelete = req.query.isDelete
        let skip = req.query.skip
        let limit = req.query.limit
        let minPrice = req.query.minPrice
        let maxPrice = req.query.maxPrice
        let minPing = req.query.minPing
        let maxPing = req.query.maxPing
        let minRoom = req.query.minRoom
        let maxRoom = req.query.maxRoom
        let minFloor = req.query.minFloor
        let maxFloor = req.query.maxFloor
        let buildingType = req.query.buildingType
        const city = req.query.city
        const area = req.query.area
        //特色
        const parking = req.query.parking
        const pet = req.query.pet
        const manager = req.query.manager
        const garbage = req.query.garbage
        const smoke = req.query.smoke
        const cook = req.query.cook
        const textQuery = req.query.textQuery
        const owner = req.query.owner

        //類型
        let typeOfRental = req.query.typeOfRental
        minPrice = minPrice*1
        maxPrice = maxPrice*1
        minPing = minPing*1
        maxPing = maxPing*1
        minRoom = minRoom*1
        maxRoom = maxRoom*1
        minFloor = minFloor*1
        maxFloor = maxFloor*1
        typeOfRental = typeOfRental*1
        buildingType = buildingType*1

        skip = skip*1;
        limit = limit*1
        if(isDelete == 'true'){
            isDelete = true
        }else{
            isDelete = false
        }

        const queryInfo = {
            isDelete
        }

        let queryInfos = []

        if(utilsValue.isValid(owner)){
            queryInfo.owner = ObjectId(owner)
        }

        if(utilsValue.isValid(city)){
            queryInfo.city = city
        }

        if(utilsValue.isValid(area)){
            queryInfo.area = area
        }

        if(utilsValue.isNumber(minFloor) && utilsValue.isNumber(maxFloor)){
            queryInfo.floor = {
                $lte : maxFloor,
                $gte : minFloor
            }
        }
        
        if(utilsValue.isNumber(minPrice) && utilsValue.isNumber(maxPrice)){
            queryInfo.price = {
                $lte : maxPrice,
                $gte : minPrice
            }
        }

        if(utilsValue.isNumber(minPing) && utilsValue.isNumber(maxPing)){
            queryInfo.ping = {
                $lte : maxPing,
                $gte : minPing
            }
        }

        if(utilsValue.isNumber(minRoom) && utilsValue.isNumber(maxRoom)){
            queryInfo['config.room'] = {
                $lte : maxRoom,
                $gte : minRoom
            }
        }
        
        if(utilsValue.isNumber(buildingType)){
            queryInfo['config.buildingType'] = buildingType
        }

        if(utilsValue.isNumber(typeOfRental)){
            queryInfo['saleInfo.typeOfRental'] = typeOfRental
        }

        if(utilsValue.isTrueStr(parking)){
            queryInfo.parking = true
        }

        if(utilsValue.isTrueStr(pet)){
            queryInfo['saleInfo.pet'] = true
        }

        if(utilsValue.isTrueStr(manager)){
            queryInfo['saleInfo.manager'] = true
        }

        if(utilsValue.isTrueStr(garbage)){
            queryInfo['saleInfo.garbage'] = true
        }

        if(utilsValue.isTrueStr(smoke)){
            queryInfo['saleInfo.smoke'] = true
        }

        if(utilsValue.isTrueStr(cook)){
            queryInfo['saleInfo.cook'] = true
        }
        
        let sort;
        try{
            sort = JSON.parse(req.query.sort)
        }catch(e){
            sort = {}
        }
        const response = {
            'status':true,
            'data':''
        }

        if(utilsValue.isValid(textQuery)){
            const textQueryExp = []
            const queryAddress = {'address':new RegExp(textQuery),isDelete}
            const queryTraffic = {isDelete}
            queryTraffic['traffic.name'] = new RegExp(textQuery)
            const queryLife = {isDelete}
            queryLife['life.name'] = new RegExp(textQuery)
            const queryEducate = {isDelete}
            queryEducate['educate.name'] = new RegExp(textQuery)
            textQueryExp.push(queryAddress)
            textQueryExp.push(queryTraffic)
            textQueryExp.push(queryLife)
            textQueryExp.push(queryEducate)
            const textQueryObj = { '$or' : textQueryExp}
            queryInfos = {'$and':[queryInfo,textQueryObj]}
        }else{
            queryInfos = queryInfo
        }

        house.getHouseList(queryInfos,skip,limit,sort,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getHouse', function(req, res) {
        /*
         #swagger.parameters['isDelete'] = {
             in: 'query',
             type: 'boolean',
         }
         */
         const response = {
            'status':true,
            'data':''
        }
         const id = req.query.id
         const isDelete = req.query.isDelete
         house.getHouse(id,isDelete,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
     });
}