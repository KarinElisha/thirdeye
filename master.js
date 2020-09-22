const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

console.log("Welcome to master!");
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'public')));

app.listen(3000);
