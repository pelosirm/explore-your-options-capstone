const {
    State
} = require('./models/models');
const {
    National
} = require('./models/models');
const {
    stateList
} = require('./models/states'); 
const {
    Career
} = require('./models/career');
const {
    Program
} = require('./models/program');
const {
    Region
} = require('./models/region');
const {
    College 
} = require('./models/college');
const {
    SavedInfo
} = require('./models/savedInfo')
const {
    User
} = require('./models/user')
const mongoose = require('mongoose');
const cors = require('cors');
const events = require('events');
const https = require('https');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const config = require('./config');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}


// ---------------- SIGN IN / CREATE USER -----------------------------------------------------
// create new user
app.post('/users/create', (req, res) => {
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            })
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                })
            }

            User.create({
                user: username,
                password: hash
            }, (err, item) => {
                if (err) {

                    console.log(err)
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                if (item) {
                    //                    console.log(`User \`${username}\` created.`);
                    return res.json(username);
                }
            })
        })
    })
})

// sign in user
app.post('/users/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    User
        .findOne({
            user: username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "internal server error"
                });
            }
            if (!items) {
                return res.status(401).json({
                    message: "not found"
                })
            } else {
                items.validatePassword(password, function (err, isValid) {
                    if (err) {
                        console.log('Password could not be validated')
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        })
                    } else {
                        return res.json(items.user);
                    }
                });
            }
        })
})

//get jobs for dropdowns

app.get('/jobs', (req,res)=>{
    let results = [];
    National
        .find()
        .then(function (jobs) {
            results.push(jobs);
            
            stateList
                .find()
                .then(function(states){
                    results.push(states)
                    res.json(results)
                })
                .catch(err=>{
                    console.error(err);
                    res.status(500).json({
                    error:'somethng went wrong'
                })
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
})


//get college info for dropdowns
app.get('/college',(req,res)=>{
    let results = [];

    Program
        .find()
        .then(function(program){
            results.push(program)
            stateList
                .find()
                .then(function(state){
                    results.push(state)
                    Region
                        .find()
                        .then(function(region){
                            results.push(region)
                            res.json(results)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).json({
                        error:'something went wrong'
                    })
                })
                })
                .catch(err=>{
                    console.error(err);
                    res.status(500).json({
                        error:'something went wrong'
                    })
                })

        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({
                error:'something went wrong'
            })
        })
})


//get career info for dropdowns
app.get('/career-search',(req,res)=>{
    let results = []
    National
        .findOne({
            'OCC_CODE':req.query.career
        })
        .then(function(job){
            results.push(job)
            State
                .findOne(
                    {'OCC_CODE':req.query.career, 
                     'ST': req.query.state
                })
                .then(function(stateWage){
                    results.push(stateWage)
                    res.json(results)
                })
                .catch(err=>{
                    console.log(err);
                    rest.status(500).json({
                        error:'something went wrong'
                    })
                })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:'something went wrong'
            })
        })
})


//get college search
app.get('/college-search',(req,res)=>{

    let degree = req.query.degree
    degree = degree.split(',')
    degree = degree.map(function(int) {
        return parseInt(int)
    })

    if(req.query.state=== null) {
    let query = {
    }
        query[req.query.speciality] = { $gt:0}, 
        query['REGION'] = parseInt(req.query.region), 
        query['HIGHDEG'] = { $in: degree}
    College
        .find(query)
        .then(function(colleges){
            res.json(colleges)
        })
        .catch(err=>{
            res.status(500).json({
                error:'something went wrong'
            })
        }) 
    } else {
    let query = {
    }
        query[req.query.speciality] = { $gt:0}, 
        query['STABBR'] = req.query.state, 
        query['HIGHDEG'] = { $in: degree}
    College
        .find(query)
        .then(function(colleges){
            res.json(colleges)
        })
        .catch(err=>{
            res.status(500).json({
                error:'something went wrong'
            })
        }) 

    }

})

//search for one college
app.get('/search/:id',(req,res)=>{
    College
        .findOne({
            _id : req.params.id
        })
        .then(function(college){
            res.json(college);
        })
        .catch(err=>{
            res.status(500).json({
                error:'something went wrong'
            })
        })
    })


//add college info
app.post('/save-info',(req,res)=>{
    College
        .findOne({
            _id : req.body.id
        })
        .then(function(info){

            let college = info.toObject();
            SavedInfo.create({
                INSTNM : college.INSTNM, 
                CITY: college.CITY,
                STABBR: college.STABBR,
                CONTROL: college.CONTROL,
                HIGHDEG : college.HIGHDEG,
                HBCU: college.HBCU,
                PBI: college.PBI,
                ANNHI: college.ANNHI,
                TRIBAL: college.TRIBAL,
                AANAPII: college.AANAPII,
                HSI: college.HSI,
                NANTI: college.NANTI,
                MENONLY: college.MENONLY,
                WOMENONLY: college.WOMENONLY,
                RELAFFIL: college.RELAFFIL, 
                "01Agriculture, Agriculture Operations, and Related Sciences": college['01Agriculture, Agriculture Operations, and Related Sciences'],
                '01Natural Resources and Conservation': college['01Natural Resources and Conservation'],
                '01Architecture and Related Services': college['01Architecture and Related Services'],
                '01Area, Ethnic, Cultural, Gender, and Group Studies': college['01Area, Ethnic, Cultural, Gender, and Group Studies'],
                '01Communication, Journalism, and Related Programs': college['01Communication, Journalism, and Related Programs'],
                '01Communications Technologies/Technicians and Support Services': college['01Communications Technologies/Technicians and Support Services'],
                '01Computer and Information Sciences and Support Services': college['01Computer and Information Sciences and Support Services'],
                '01Personal and Culinary Services': college['01Personal and Culinary Services'],
                '01Education': college['01Education'],
                '01Engineering': college['01Engineering'],
                '01Engineering Technologies and Engineering-Related Fields': college['01Engineering Technologies and Engineering-Related Fields'],
                '01Foreign Languages, Literatures, and Linguistics': college['01Foreign Languages, Literatures, and Linguistics'],
                '01Family and Consumer Sciences/Human Sciences': college['01Family and Consumer Sciences/Human Sciences'],
                '01Legal Professions and Studies': college['01Legal Professions and Studies'],
                '01English Language and Literature/Letters': college['01English Language and Literature/Letters'],
                '01Liberal Arts and Sciences, General Studies and Humanities': college['01Liberal Arts and Sciences, General Studies and Humanities'],
                '01Library Science': college['01Library Science'],
                '01Biological and Biomedical Sciences': college['01Biological and Biomedical Sciences'],
                '01Mathematics and Statistics': college['01Mathematics and Statistics'],
                '01Military Technologies and Applied Sciences': college['01Military Technologies and Applied Sciences'],
                '01Multi/Interdisciplinary Studies': college['01Multi/Interdisciplinary Studies'],
                '01Parks, Recreation, Leisure, and Fitness Studies': college['01Parks, Recreation, Leisure, and Fitness Studies'],
                '01Philosophy and Religious Studies': college['01Philosophy and Religious Studies'],
                '01Theology and Religious Vocations': college['01Theology and Religious Vocations'],
                '01Physical Sciences': college['01Physical Sciences'],
                '01Science Technologies/Technicians': college['01Science Technologies/Technicians'],
                '01Psychology': college['01Psychology'],
                '01Homeland Security, Law Enforcement, Firefighting and Related Protective Services': college['01Homeland Security, Law Enforcement, Firefighting and Related Protective Services'],
                '01Public Administration and Social Service Professions': college['01Public Administration and Social Service Professions'],
                '01Social Sciences': college['01Social Sciences'],
                '01Construction Trades': college['01Construction Trades'],
                '0Mechanic and Repair Technologies/Technicians': college['0Mechanic and Repair Technologies/Technicians'],
                '01Precision Production': college['01Precision Production'],
                '01Transportation and Materials Moving': college['01Transportation and Materials Moving'],
                '01Visual and Performing Arts': college['01Visual and Performing Arts'],
                '01Health Professions and Related Programs': college['01Health Professions and Related Programs'],
                '01Business, Management, Marketing, and Related Support Services': college['01Business, Management, Marketing, and Related Support Services'],
                '01History': college['01History'],
                UGDS:college.UGDS,
                NPT4: JSON.stringify(college.NPT4),
                NPT41: JSON.stringify(college.NPT41),
                NPT42: JSON.stringify(college.NPT42),
                NPT43: JSON.stringify(college.NPT43),
                NPT44: JSON.stringify(college.NPT44),
                NPT45: JSON.stringify(college.NPT45), 
                MD_EARN_WNE_P10: college.MD_EARN_WNE_P10,
                GT_25K_P6: college.GT_25K_P6,
                GRAD_DEBT_MDN_SUPP: college.GRAD_DEBT_MDN_SUPP,
                GRAD_DEBT_MDN10YR_SUPP: college.GRAD_DEBT_MDN10YR_SUPP,
                RPY_3YR_RT_SUPP: college.RPY_3YR_RT_SUPP,
                C150_L4_POOLED_SUPP: college.C150_L4_POOLED_SUPP,
                user: 'riley'
            })
            .then(collegeSave => res.status(201).json(req.body.id + ' added'))
            .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });

           
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:'something went wrong'
            })
        })
    })

//add career info
app.post('/career/create-new', (req, res) => {
    Career
        .create({
            career: req.body.career,
            state: req.body.state,
            nat_a_median: req.body.nat_a_median,
            st_a_median: req.body.st_a_median,
            education: req.body.education,
            experience: req.body.experience,
            user: req.body.user,
        })
        .then(career => res.status(201).json(req.body.career + ' added'))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });

});

//get the user saved info
app.post('/user-saved-info', (req, res) => {
    let results = [];

    SavedInfo
        .find({
            user : req.body.user
        })
        .then(function(college){
            results.push(college)
            Career
                .find({
                    user: req.body.user
                })
                .then(function(career){
                    results.push(career)
                    res.json(results)
                })
                .catch(err=>{
                    res.status(500).json(
                    {
                        error: err
                    })
                })
        })
        .catch(err=>{
            res.status(500).json({
                error:'something went wrong'
            })
        })

});

//get modal info for saved info
app.post('/modal-info', (req, res) => {
    if(req.body.category === 'career') {
        Career
            .find({
                _id: req.body.id
            })
            .then(function(career){
                res.json(career)
            })
            .catch(err=>{
                res.status(500).json(
                    {
                        error: err
                    })
        })
    } else {
        SavedInfo
            .find({
                _id : req.body.id
            })
            .then(function(info){
                res.json(info)
            })
            .catch(err=>{
                res.status(500).json({

                    error : err
                })
            })
    }
});


//compare college and career for ROI
app.post('/compare',(req,res)=>{
    let results = [];
    console.log(req.body)
    Career
        .find({
            _id: req.body.career
        })
        .then(function(career){
            results.push(career);

            SavedInfo.find({
                _id : req.body.college
            })
            .then(function(collegeInfo){
                results.push(collegeInfo);
                res.json(results);
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:'something went wrong'
                })
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:'something went wrong'
            })
        })
})

//delete saved info

app.delete('/delete-info', (req, res) => {
    console.log(req.body)
    if(req.body.category === 'career') {
        Career
            .remove({
                _id: req.body.id
            })
            .then(function(){
                res.status(204).end();
            })
            .catch(err=>{
                res.status(500).json(
                    {
                        error: err
                    })
        })
    } else {
        console.log(req.body.id)
        SavedInfo
            .remove({
                _id : req.body.id
            })
            .then(function(info){
                res.status(204).end();
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({

                    error : err
                })
            })
    }
});

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
