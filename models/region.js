'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const regionSchema = mongoose.Schema({
	REGION : {
		type: String
	}, 
	CODE : {
		type: String
	}
})

const Region = mongoose.model('region', regionSchema);

module.exports = {
    Region: Region
}