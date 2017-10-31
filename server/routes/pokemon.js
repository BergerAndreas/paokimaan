var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://anton:anton@ds241395.mlab.com:41395/pokeweebs', ['pokemon']);

//Get All Pokemon
router.get('/pokemon', function(req, res, next){
    db.pokemon.find(function(err, pokemon){
        if(err){
            res.send(err);
        }
        res.json(pokemon);
    });
});

//Get single pokemon
router.get('/pokemon/:id', function(req, res, next){
    db.pokemon.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, pokemon){
        if(err){
            res.send(err);
        }
        res.json(pokemon);
    });
});

module.exports = router;
