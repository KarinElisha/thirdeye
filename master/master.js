const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const config = require('./../config.json');
const dronesService = `http://localhost:${config.app.slave.port}`;
console.log("Welcome to master!");
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'public')));
app.get('/drones', async (request,response)=>{
    //connect to microservice slave js with axios
    const minutes = request.query.minutes;
    try{
        const result = await axios.get(`${dronesService}/droneTime?minutes=${minutes}`);
        response.json(result.data);
    }
    catch(err){
        response.status(500).json("error");
    }
  
})
app.post('/drones', async (request,response)=>{
    //connect to microservice slave js with axios
    const payload = request.body;
    console.log(request);
    try{
        const result = await axios.post(`${dronesService}/drone`,payload);
        response.json(result.data);
    }
    catch(err){
        response.status(500).json("error");
    }
  
})
app.listen(config.app.master.port);
