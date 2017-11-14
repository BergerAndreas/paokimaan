import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Pokemon from '../models/pokemon';

const should = chai.use(chaiHttp).should();

describe('Pokemon', () => {

  beforeEach(done => {
    Pokemon.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for Pokemen', () => {

    it('should get all the pokemen', done => {
      chai.request(app)
        .get('/api/pokemon')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(151);
          done();
        });
    });

    it('should get ten pokemen', done => {
      chai.request(app)
        .get('/api/pokemon/prr/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });

    it('should get pokemon count', done => {
      chai.request(app)
        .get('/api/pokemon/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(151);
          done();
        });
    });


    it('should get a pokemon by its id', done => {
      chai.request(app)
        .get(`/api/pokemon/1`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('weight');
          res.body.should.have.property('height');
          res.body.should.have.property('id').eql(1);
          done();
        });
    });

    it('should get a pokemon by its type', done => {
      chai.request(app)
        .get(`/api/pokemon/type/water`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

});
