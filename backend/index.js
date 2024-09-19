const express = require('express');
const mysql= require('mysql2');
const cors = require('cors');
const vehiclesRoutes = require('./routes/vehicles')

const app = express();
app.use(cors());
const port =5000;

app.use(express.json());

app.use('/vehicles',vehiclesRoutes)

app.listen(port,()=>{
    console.log(`running port on ${port}`);
    
});