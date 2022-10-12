var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  //return json with id, name, and message
  res.json({message: 'Hello World', status: 'ok'});

});

module.exports = router;
