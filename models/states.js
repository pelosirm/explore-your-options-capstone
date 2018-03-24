'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const stateListSchema = mongoose.Schema({
	State : {
		type : String
	}, 
	Abbreviation : {
		type : String 
	}
})

const stateList = mongoose.model('state', stateListSchema)

module.exports = {
	stateList : stateList
}