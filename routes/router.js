/**
 * Created by alan on 2017/5/1.
 */

'use strict';

/* start register route request */

module.exports = function (app) {
  app.get('/(.html?)?', function(req, res, next) {
    res.redirect('/index.html');
  });

  app.get('/index(.html?)?', function(req, res, next) {
    res.render('home');
  });

  app.get('/blog(.html?)?', function (req, res, next) {
    res.render('blog');
  });

  app.get('/about(.html?)?', function (req, res, next) {
    res.render('about');
  });

  // 404 page
  app.use(function (req, res, next) {
    if (!res.headersSent) {
      res.status(404).render('404');
    }
  });
};



