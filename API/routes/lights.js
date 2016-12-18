var express = require('express');
var router = express.Router();
var Light = require('../models/light')




function setCurrentDate(lightMessage) {
	lightMessage.date = Date.now();
}


function validateBodyData(req) {
	return {
		username: req.body.username,
		sequence: req.body.sequence,
		name: req.body.name,
		date: req.body.date 
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

router.get('/latest', (req, res) => {
	Light.findOne({}).sort({date:-1}).exec( (err, data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}		
	})
})

router.post('/', (req, res) => {
	let inData = validateBodyData(req);
	if (inData == {}) {
		return res.sendStatus(204)		// no content
	}
	setCurrentDate(inData);
	let light = Light.create(inData, (err, data) => {
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
		return res.sendStatus(204)		// no content
	}
	setCurrentDate(inData);
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
