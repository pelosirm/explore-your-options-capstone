'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const careerSchema = mongoose.Schema({
	career : {
		type : String, 
		required: true
	}, 
	state : {
		type: String, 
		required: true
	}, 
	nat_a_median : {
		type: String, 
		required: true
	},
	st_a_median : {
		type: String, 
		required: true
	},  
	education : {
		type: String, 
		required : true
	}, 
	experience : {
		type: String, 
		required : true
	}, 
	user : {
		type: String, 
		required: true
	}
})

const Career = mongoose.model('career', careerSchema);

module.exports = {
    Career: Career
}