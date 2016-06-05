var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var object = require('./routes/object');
var db = mongoose.connect('mongodb://localhost/vdtest');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', object);

module.exports = app;