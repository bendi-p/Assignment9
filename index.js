var express = require("express");
var mongoose = require('mongoose');
var serviceRouter = require('./routes/index');
var cors = require('cors');
var path = require('path');

mongoose.connect("mongodb+srv://superuser:Admin123@cluster0.lplgl.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log('db connected');
}, (err) => {
    console.log(err.message, 'err while connecting db');
})

var port = process.env.PORT || 3999;

var app = express();
app.use(express.json());
app.use(cors());
app.use('/', serviceRouter);
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server running on port: " + port
    });
})

app.listen(port, () => {
    console.log('listening on port: ' + port);
})