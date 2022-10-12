var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  //return json with id, name, and message
  res.json({
    message: 'getting messages',
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

router.delete('/:id', function (req, res, next) {
  //return json with id, name, and message
  let id = req.params.id;
  res.json({
    message: `DELETING message with ID ${id}`,
    status: 'ok',
  });
});

//get message by username
router.get('/user/:username', function (req, res, next) {
  //return json with id, name, and message
  let username = req.params.username;
  res.json({
    message: `GETTING messages for user ${username}`,
    status: 'ok',
  });
});


module.exports = router;