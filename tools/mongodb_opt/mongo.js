/**
 * Created by alan on 2017/5/3.
 */

'use strict';

var mongoose = require('mongoose');
var dbAddress = '//192.168.0.106/alanBlog';
var db = mongoose.createConnection('mongodb:' + dbAddress);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connect to mongoDB server(' + dbAddress + ') succeed.');

  var BlogSchema = new mongoose.Schema({
      blogID: Number,
      title: {
        ch: String,
        en: String
      },
      author: {
        ID: String,
        name: String,
        portraitPath: String
      },
      content: String,
      updated: Date,
      state: String,
      privacy: String,
      tagsArray: [{
        name: String,
        ID: String
      }],
      commentArray: [{
          author: {
            ID: String,
            name: String,
            portraitPath: String
    },
      ipAddrss: String,
        comment: String,
        updated: Date
    }]
  });

  BlogSchema.methods.speak = function () {
    console.log('This blog\'s title is ' + this.title.ch);
  };
  var BlogModel = db.model('Blog', BlogSchema);


  var tmpDate = new Date();
  var blogEntity = new BlogModel({
    blogID: 1,
    title: {ch: '这是alanblog的第一篇博文', en: ''},
    author: {ID: '000001', name: 'alan.tang', portraitPath: ''},
    content: '要成为 JavaScript 开发者现在是最好的时机了，而且会越来越好。主要是因为HTML5 的来临，Flash的逝去，' +
      '移动设备的普及，以及最重要的Node.js——开发者终于可以在服务器端使用JavaScrpit了。',
    updated: tmpDate,
    state: 'preEdit',
    privacy: 'private',
    tagsArray: [{name: '杂谈', ID: ''}]
  });

  blogEntity.speak();
  blogEntity.save();
});