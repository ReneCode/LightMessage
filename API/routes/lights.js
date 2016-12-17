var express = require('express');
var router = express.Router();
var Light = require('../models/light')



function validateBodyData(req) {
	return {
		username: req.body.username,
		sequence: req.body.sequence
	}
}

router.get('/', (req, res) => {
	let filter = {};
	Light.find(filter).exec(function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}		
	})
});

router.post('/', (req, res) => {
	let light = Light.create(validateBodyData(req), function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.status(201).send('/lights/' + data._id);
		}
	})
})

router.put('/:id', (req, res) => {
	let id = req.params.id
	if (!id) {
		return res.sendStatus(404, null)		// id invalid
	}
	let inData = validateBodyData(req);
	if (inData == {}) {
		return res.sendStatus(204)		// no centent
	}
	Light.findByIdAndUpdate(id, inData,(err, data) => {
		if (err) {
			return res.sendStatus(404) 			// id not found
		} else {
			if (!data) {
				return res.sendStatus(404)		// no data updated / not found
			} else {
				return res.sendStatus(200)
			}
		}
	})
})

module.exports = router;
