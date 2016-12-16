var express = require('express');
var router = express.Router();
var Light = require('../models/light')

router.get('/', function(req, res, next) {
	let filter = {};
	Light.find(filter).exec(function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}		
	})
});

router.post('/', function(req, res, next) {
	let inData = {
		username: req.body.username,
		sequence: req.body.sequence
	}
	let light = Light.create(inData, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	})
})

module.exports = router;
