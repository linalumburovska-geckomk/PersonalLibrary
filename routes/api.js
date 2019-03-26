/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

const Books = require('../models/books')
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/library');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Books.find().exec(function(error,data) {
        return res.json(data);
      })
    })
    
    .post(function (req, res){
      var title = req.body.title;
      
      if(title===undefined){
        return res.json('title is empty!')
      }
      var data = new Books({
        "title": title
      })  

      data.save(err => {
        if(err){
            return res.send('Error');
        }
    })
    return res.json(data);
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Books.remove(function(error,data){
        if(error){
          return res.send('Error');
        }else {
          return res.json('complete delete successful')
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      Books.findById(bookid).exec(function(error,data) {
        return res.json(data);
      })
      return res.json('no book exists');
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      Books.findById(bookid).exec(function(error,data) {
        data.comments.push(comment);
        data.save();
        return res.json(data);
      })
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      Books.findByIdAndRemove(bookid).exec(function(error,data) {
        if(error){
          return res.send('Error');
        }else {
          return res.json('delete successful')
        }
      })
      //if successful response will be 'delete successful'
    });
  
};
