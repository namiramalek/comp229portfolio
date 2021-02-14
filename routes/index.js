/* Student name : Namirabanu Malek,
student id : 301178112,
Subject :COMP229-web application development
Date : 10 feb 2021 */
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Personal Portfolio' });

});
/* GET home page. */
router.get('/Home', function(req, res, next) {
  res.render('index', { title: 'Personal Portfolio' });

});
/* GET about page. */
router.get('/About', function(req, res, next) {
  res.render('about', { title: 'About' });


});
/* GET project page. */
router.get('/Project', function(req, res, next) {
  res.render('project', { title: 'Project' });

});
/* GET service page. */
router.get('/Service', function(req, res, next) {
  res.render('service', { title: 'Service' });

});
/* GET contact me page. */
router.get('/ContactMe', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });

});








module.exports = router;
