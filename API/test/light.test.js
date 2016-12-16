let assert = require('chai').assert
//let re = require('regex')
let superagent = require('superagent')
let server = require('../server')
let Light = require('../models/light')

let URL = 'http://localhost:3000/lights'


describe('REST interface light', function() {
	let api;

	before(function(done) {
		api = server.listen(3000, function() {
			done();
		});
	})

	after(function() {
		api.close();
	})

	beforeEach(function(done) {
		Light.remove({}, function(err) {
			done();
		})
	})

	// GET
	it ('should provide GET', function(done) {
		superagent.get(URL, function(err, res) {
			assert.ifError(err)
			done();
		})
	})

	it ('should get data from GET', function(done) {
		let l1 = {username:"44", sequence: { a:43, b:"xyz"} };
		let light = new Light( l1 );
		light.save();
		superagent.get(URL, function(err, res) {
			assert.equal(res.body.length, 1)
			let data = res.body[0];
			assert.equal(data.username, l1.username)
			assert.deepEqual(data.sequence, l1.sequence)
			done();
		})
	})

	// POST
	it ('should provide POST', function(done) {
		superagent.post(URL, {}, function(err, res) {
			assert.ifError(err)		
			done();
		})
	})

	it ('should return status 201 from POST', function(done) {
		let l1 = {username:"abc", sequence: { a:42, b:"post-data"} };
		superagent.post(URL)
		.set('Content-Type', 'application/json')
		.send(l1)
		.end(function(err, res) {
			assert.equal(201, res.statusCode)	
			assert.include(res.text, '/lights/');
			assert.match(res.text, /\/lights\/[\w]+$/);
			done();
		})
	})

})