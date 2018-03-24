'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const collegeSchema = new mongoose.Schema({ any: {} })

const College = mongoose.model('college', collegeSchema);

module.exports = {
    College: College
}