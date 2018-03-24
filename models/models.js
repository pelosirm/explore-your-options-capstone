'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;


const stateSchema = mongoose.Schema({
    ST: {
        type: String
    },
    STATE: {
        type: String
    },
    OCC_CODE: {
        type: String
    },
    OCC_TITLE: {
        type: String
    },
    OCC_GROUP: {
        type: String
    },
    H_MEAN: {
        type: Number
    }, 
    A_MEAN: {
        type: Number
    }, 
    H_MEDIAN: {
        type: Number
    }, 
    A_MEDIAN: {
        type: Number
    }, 
    A_PCT75: {
        type: Number
    }, 
    A_PCT90: {
        type: Number
    }
});

const nationalSchema = mongoose.Schema({
    OCC_TITLE: {
        type: String
    },
    OCC_CODE: {
        type: String
    },
    EMP_CHANGE_PERCEMT: {
        type: Number,
    },
    NAT_A_MEDIAN: {
        type: Number,
    },
    EDUCATION: {
        type: String,
    },
    WORK_EXPERIENCE: {
        type: String,
    }, 
    OTJ_TRAINIG: {
        type: String,
    }
});


nationalSchema.methods.serialize = function() {
    return {
        OCC_TITLE : this.OCC_TITLE,
        OCC_CODE: this.OCC_CODE
    };
};

const State = mongoose.model('state_wage', stateSchema);
const National = mongoose.model('national_wage', nationalSchema, 'national_wages');

module.exports = {
    State: State,
    National: National,
}
