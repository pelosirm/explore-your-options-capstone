'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const programSchema = mongoose.Schema({
	PROGRAM : {
		type: String
	}, 
	CODE : {
		type: String
	}
})

const Program = mongoose.model('program', programSchema);

module.exports = {
    Program: Program
}