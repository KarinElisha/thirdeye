const client = require('./db');

client.connect();
const getAllDronesByTime = async function(minutes){
    const sql = `SELECT * FROM drones WHERE lastupdate >= NOW() - INTERVAL '${minutes} minutes';`
    try{
        const result = await client.query(sql);
        return result.rows;
    }
    catch(err){
        throw "error " +err;
    }
}

const insertNewDrone = async function(payload){
    const sqlCheckifExists = `SELECT * FROM drones WHERE  droneid=$1`;
    try{
    
        const result = await client.query(sqlCheckifExists,[payload.droneid])
        if(result.rows.length>0){
                const sqlUpdate = `UPDATE drones SET droneip=$1,payload=$2,lastupdate=$3,status=$4 WHERE droneid=$5`;
                const resultUpdate = await client.query(sqlUpdate,[payload.droneip,payload.payload,new Date(),payload.status,payload.droneid]);
                return "ok";
        } else{
             const insertSql = `INSERT INTO drones (droneid,droneip,payload,status,lastupdate) VALUES($1,$2,$3,$4,$5)`;
             const resultInsert = await client.query(insertSql,[payload.droneid,payload.droneip,payload.payload,payload.status,new Date()]);
                return "ok";
        }
       
    } 
    catch(err){
        throw "error " + err;
    }

};

module.exports = { insertNewDrone,getAllDronesByTime }
