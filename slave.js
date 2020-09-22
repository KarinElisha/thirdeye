const express = require('express');
const app = express();
const entities = require('./entities');
console.log("Slave server initiazlied");
app.use(express.json());

app.post('/drone',(request,response)=>{
let payload = request.body.payload;

});
app.listen(3001);
