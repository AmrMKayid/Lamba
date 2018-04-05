process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../api/models/item.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

console.log("hello");