exports.on = function(app) {
    const preRestApi = '/reserveHouse';
    const reserveHouse = require('../role/reserveHouse');
    const utilsValue = require('../utils/value');

    app.post(preRestApi + '/addReserveHouse', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a reserve house',
            schema: {
                client:'61ed2777f5178ce385654350',
                host:'61ed2777f5178ce385654351',
                houseId:'61ed2777f5178ce385654352',
                state: 0,
                type:1,
                clientName:'Chris',
                clientPhone:'0909636123'
            }
        }*/ 

        
        const client = req.body.client
        const host = req.body.host
        const houseId = req.body.houseId
        const state = req.body.state
        const type = req.body.type
        const clientName = req.body.clientName
        const clientPhone = req.body.clientPhone
        const response = {
            'status':true,
            'data':''
        }
        reserveHouse.addReserveHouse(client,host,houseId,state,type,clientName,clientPhone,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editReserveHouse', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a house',
            schema: {
                id:'61ed2777f5178ce385654350',
                client:'61ed2777f5178ce385654350',
                host:'61ed2777f5178ce385654351',
                houseId:'61ed2777f5178ce385654352',
                state: 0,
                type:1,
                clientName:'Chris',
                clientPhone:'0909636123'
            }
        }*/ 

        const id = req.body.id
        const client = req.body.client
        const host = req.body.host
        const houseId = req.body.houseId
        const state = req.body.state
        const type = req.body.type
        const clientName = req.body.clientName
        const clientPhone = req.body.clientPhone
        const response = {
            'status':true,
            'data':''
        }
        reserveHouse.editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeReserveHouse', function(req, res) {
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
        reserveHouse.removeReserveHouse(ids,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getReserveHouses', function(req, res) {
       /*
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        */ 
        let skip = req.query.skip
        let limit = req.query.limit
        let host = req.query.host
        let client = req.query.client
        let states = req.query.states
        let type = req.query.type

        if(!utilsValue.isValid(skip)){
            skip = 0;
        }
        if(!utilsValue.isValid(limit)){
            limit = 300;
        }
        if(!utilsValue.isValid(host)){
            host = '';
        }
        if(!utilsValue.isValid(client)){
            client = '';
        }
        if(!utilsValue.isValid(states)){
            states = '';
        }
        if(utilsValue.isValid(type)){
            type = type*1;
        }

        skip = skip*1;
        limit = limit*1;
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

        reserveHouse.getReserveHouses(host,client,states,type,skip,limit,sort,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getReserveHouse', function(req, res) {
         const response = {
            'status':true,
            'data':''
        }
        const id = req.query.id
         reserveHouse.getReserveHouse(id,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
     });
}