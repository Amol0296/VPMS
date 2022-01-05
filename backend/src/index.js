const express = require('express');
const path = require('path')
const vehicleRoute = require('./router/vehicle');
const userRoute = require('./router/user');
const app = express();
// const publicDirectoryPath = path.join(__dirname,'./public');
const port = process.env.port || 3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","*");
    next();
  });
// app.use(express.static(publicDirectoryPath))
app.use('/vehicle',vehicleRoute)
app.use('/user',userRoute);
app.listen(port,()=>{
    console.log("Server started");
})
