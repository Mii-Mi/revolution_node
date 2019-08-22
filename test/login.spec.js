const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('#login', ()=>{
    
    it('should not login inexisting user', (done) => {

        let body = {
            userName: 'notexistingusr',
            pass: 'toto'
        }
        chai.request(app)
            .post('/users/login')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.eql({})
                res.req.path.should.eql('/')
            done()
            })

    })

    it('should not login wrong password', (done) => {

        let body = {
            userName: 'toto',
            pass: 'foo'
        }
        chai.request(app)
            .post('/users/login')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.eql({})
                res.req.path.should.eql('/')
            done()
            })

    })

    it('should login correct member/password', (done) => {

        let body = {
            userName: 'toto',
            pass: 'toto'
        }
        chai.request(app)
            .post('/users/login')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.req.path.should.eql('/userProfile/5cd9a8b456f71b09c7018d6a')
            done()
            })

    })
})