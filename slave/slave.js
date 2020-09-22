const express = require('express');
const app = express();
const entities = require('./entities');
const config = require('./../config.json');
console.log("Slave server initiazlied");
app.use(express.json());

app.post('/drone', async (request, response) => {
    let payload = request.body;
    try {
        
        const result = await entities.insertNewDrone(payload);
        response.json(result);
    }
    catch (err) {
        response.status(500).json(err);
    }

});

app.get('/droneTime', async (request, response) => {
    let payload = request.query;
    try {
        if (payload.minutes == -1 || isNaN(payload.minutes) || !payload.minutes) {
            payload.minutes = config.app.slave.defaultMinutes;
        }
        const result = await entities.getAllDronesByTime(payload.minutes);
        response.json(result);
    }
    catch (err) {
        response.status(500).json(err);
    }
});
app.listen(config.app.slave.port);
