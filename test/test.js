import * as chai from 'chai'
import { expect } from 'chai'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const chaiHttp = require('chai-http')
import faker from 'Faker'
import app from '../index.js'


const ChaiTest = chai.use(chaiHttp)

describe('GET /api/readUser',()=>{
    it('should GET all info',(done)=>{ //done is a callback function
        ChaiTest.request(app)  //chai.request is a function that sends a request to the app
        .get('/api/readUser')
        .end((err,res)=>{
            expect(err).to.be.null //expect is a function that compares the result of the request with the expected result
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array') 
            expect(res.body).not.have.lengthOf(0)
            done()
        })
    })
}) 

 describe('POST /api/insertUser', ()=>{
    it('should POST all info',(done)=>{ //done is a callback function
        let test = {
            userName: faker.Lorem.words(1)[0],
            userPhone: faker.phone.phoneNumber(), // '197089478'
            userEmail: faker.Internet.email(),
        }
        console.log(test)
        ChaiTest.request(app)  //chai.request is a function that sends a request to the app
            .post('/insertUser')
            .send(test)
            .end((err,res)=>{
                expect(err).to.be.null //expect is a function that compares the result of the request with the expected result
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('test')
            })
        done()
    })
})
/*
describe('GET /api/info/:id',()=>{
    it('should GET all info for id',(done)=>{ //done is a callback function
        ChaiTest.request(app)  //chai.request is a function that sends a request to the app
        .get('/api/info/2')
        .end((err,res)=>{
            expect(err).to.be.null //expect is a function that compares the result of the request with the expected result
            expect(res).to.have.status(200)
            expect(res.body[0]).to.have.property('id')
            expect(res.body[0].id).to.be.equal(2);
            
        })
    done()    
    })
}) */