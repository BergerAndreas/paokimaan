import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Pokemon from '../models/pokemon';
import {TestPokemon} from './testpokemon';
const should = chai.use(chaiHttp).should();

describe('Pokemon', () => {

  // Setup before each test
  beforeEach(done => {
    Pokemon.remove({}, err => {
    });

    // Get an example pokemon from file
    const pokemon = new Pokemon(
      TestPokemon
    );
    pokemon.save((err) => {
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
          res.body.length.should.be.eql(1);
          done();
        });
    });

    // Test of dynamic pagination
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
          res.body.should.be.eql(1);
          done();
        });
    });

    // Get a pokemon by it's number in pokedex (not object id)
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

    // Get pokemen of certain type
    it('should get all pokemon by type', done => {
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
