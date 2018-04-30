'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout

const expect = chai.expect;

const {
    State
} = require('../models/models');
const {
    National
} = require('../models/models');
const {
    stateList
} = require('../models/states'); 
const {
    Career
} = require('../models/career');
const {
    Program
} = require('../models/program');
const {
    Region
} = require('../models/region');
const {
    College 
} = require('../models/college');
const {
    SavedInfo
} = require('../models/savedInfo')
const {
    User
} = require('../models/user')
const {
    app,
    runServer,
    closeServer
} = require('../server');
const {
    TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);

function createCareer() {
    return {
            career: faker.lorem.words(),
            state: 'GA',
            nat_a_median: faker.random.number(),
            st_a_median: faker.random.number(),
            education: 'Bachelors',
            experience: '3 years',
            user: 'Cindy'
    }
}


describe('Explore Your Options API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });


    after(function () {
        return closeServer();
    });

    describe('GET endpoints', function () {

        it('should return full list of jobs for searches', function () {
            let res;
            return chai.request(app)
                .get('/jobs')
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                })
        });

        it('should return full list of colleges for searches', function () {
            let res;
            return chai.request(app)
                .get('/college')
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                })
        });

        it('should return career info for selected career', function () {
            let career;
            let res;
            return 
                National
                .findOne()
                .then(function(_career){
                    career = _career
                    return chai.request(app)
                        .get(`/career-search/?career=${_career.OCC_CODE}&state=${_career.state}`)
                        .then(function (_res) {
                            expect(_res).to.have.status(200);
                            expect(_res).to.be.json;
                        })
                })
        });

        it('should return all college info for college input',function(){
            let college
            let speciality = '01Agriculture, Agriculture Operations, and Related Sciences'
                return College
                    .findOne()
                    .then(function(_college){
                        college = _college
                        return chai.request(app)
                        .get(`/college-search/?degree=${_college.HIGHDEG}&speciality=${speciality}&region=${_college.REGION}&state='null'`)
                        .then(function(_res){
                            expect(_res).to.have.status(200);
                            expect(_res).to.be.json
                        })
                    })
        })

        it('it should return a single college for search for id',function(){
            let college;
            College
            .findOne()
            .then(function(_college){
                college = _college
                return chai.request(app)
                    .get(`/search/${college._id}`)
                    .then(function(_res){
                        expect(_res).to.have.status(200);
                        expect(_res).to.be.json;
                    })
            })
        })


    })


    describe('POST endpoint', function () {

        it('should add new user', function () {

            const newUser = {
                username: 'Cindy',
                password: '123'
            }

            return chai.request(app)
                .post('/users/create')
                .send(newUser)
                .then(function (res) {
                    expect(res).to.be.json;
                })

        })

        it('should add college information to user', function () {
            let college;
            let info = {
                user : 'demo', 
                degree : 3, 
                id : ''
            }
            const newUser = {
                username: 'Cindy',
                password: '123'
            }
            return College
            .findOne()
            .then(function(_college){
                info.id = _college.id 
                return chai.request(app)
                    .post('/save-info')
                    .send(info)
                    .then(function (res) {
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;

                })
            })
        })

        it('should add career information to user',function(){
            const newCareer = createCareer();
            return chai.request(app)
                .post('/career/create-new')
                .send(newCareer)
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json
                })
        })

        it('should return user posted information',function(){
            const user = {
                user : 'riley'
            }

            return chai.request(app)
                .post('/user-saved-info')
                .send(user)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.json
                })

        })

        it('should get modal info for career category',function(){
            const query = { category : 'career'}

            return Career
            .findOne()
            .then(function(_career){
                query.id = _career.id 
                return chai.request(app)
                    .post('/modal-info')
                    .send(query)
                    .then(function(res){
                         expect(res).to.have.status(200);
                         expect(res).to.be.json
                    })

            })
        })

        it('should get modal info for college category',function(){
            const query = { category : 'college'}

            return SavedInfo
            .findOne()
            .then(function(_college){
                query.id = _college.id 
                return chai.request(app)
                    .post('/modal-info')
                    .send(query)
                    .then(function(res){
                         expect(res).to.have.status(200);
                         expect(res).to.be.json
                    })
            })
        })

        it('should return compare data',function(){
            const query = {
                career : '', 
                college : ''
            }

            return Career
            .findOne()
            .then(function(_career){
                query.career = _career.id 
                return SavedInfo
                    .findOne()
                    .then(function(_college){
                        query.college = _college.id
                })

            })
            .then(function(res){
                    return chai.request(app)
                            .post('/compare')
                            .send(query)
                            .then(function(res){
                                 expect(res).to.have.status(200);
                                 expect(res).to.be.json
                    })
            })
        })

    });

    describe('DELETE endpoint', function () {

        it('delete compare career data by id', function () {

            let category = {
                category : 'career',
                id : '' 
            }

            let career;

            return Career
                .findOne()
                .then(function (_career) {
                    category.id = _career.id;
                    return chai.request(app)
                    .delete('/delete-info')
                    .send(category)
                })
                .then(function (res) {
                    expect(res).to.have.status(204);
                    return Career.findById(category.id);
                })
                .then(function (_career) {
                    expect(_career).to.be.null;
                });
        });

        it('delete compare college data by id', function () {

            let category = {
                category : 'college',
                id : '' 
            }

            let college;

            return SavedInfo
                .findOne()
                .then(function (_college) {
                    category.id = _college.id;
                    return chai.request(app)
                    .delete('/delete-info')
                    .send(category)
                })
                .then(function (res) {
                    expect(res).to.have.status(204);
                    return SavedInfo.findById(category.id);
                })
                .then(function (_college) {
                    expect(_college).to.be.null;
                });
        });
    });

})
