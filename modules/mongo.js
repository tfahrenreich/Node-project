/**
 * Created by Tim on 2/24/2016.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
var ObjectId = require('mongodb').ObjectID;




exports.doThing =  function(data){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('hey').insertOne(data, function(err, result){
            db.close();
        });
    });
};