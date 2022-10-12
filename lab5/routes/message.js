var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  //return json with id, name, and message
  res.json({
    message: 'Hello World',
    status: 'ok',
  });
});

router.get('/:id', function (req, res, next) {
  //return json with id, name, and message
  let id = req.params.id;
  res.json({
    message: `GETTING messages with ID ${id}`,
    status: 'ok',
  });
});

router.post('/', function (req, res, next) {
  //return json with id, name, and message
  res.json({
    message: 'POSTING a new message for user Pikachu',
    status: 'ok',
  });
});

router.put('/:id', function (req, res, next) {
  //return json with id, name, and message
  let id = req.params.id;
  res.json({
    message: `UPDATING message with ID ${id}`,
    status: 'ok',
  });
});



module.exports = router;