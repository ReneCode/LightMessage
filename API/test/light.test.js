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

	it ('should get one latest data from GET', function(done) {
		let l1 = {username:"11", sequence: { a:11, b:"xyz"}, date:new Date(2010, 5, 2, 11, 44)  };
		let light1 = new Light( l1 );
		light1.save();
		let l2 = {username:"22", sequence: { a:22, b:"abc"}, date:new Date(2010, 5, 2, 11, 45)  };
		let light2 = new Light( l2 );
		light2.save();
		let l3 = {username:"33", sequence: { a:33, b:"abc"}, date:new Date(2010, 5, 2, 11, 24)  };
		let light3 = new Light( l3 );
		light3.save();
		let url = URL + '/latest'
		superagent.get(url, function(err, res) {
			assert.isNotNull(res.body)
			let data = res.body;
			assert.equal(data.username, l2.username)
			assert.deepEqual(data.sequence, l2.sequence)
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

	// PUT
	it ('should return 404 on bad id on PUT', function(done) {
		let url = URL + '/abc';
		superagent.put(url, {}, function(err, res) {
			assert.equal(res.statusCode, 404)		
			done();
		})
	})

	it ('should update light PUT', function(done) {
		let l1 = {username:"44", sequence: { a:43, b:"xyz"} };
		let light = new Light( l1 );
		light.save();
		let id = light._id;
		let url = URL + '/' + id;
		let l2 = {username:"333", sequence: { a:66, c:'hallo'} };
		superagent.put(url)
		.send(l2)
		.end(function(err, res) {
			assert.equal(res.statusCode, 200)	
			Light.findById(id, (err, data) => {
				assert.deepEqual(data.username, l2.username)
				assert.deepEqual(data.sequence, l2.sequence)
				done();
			})
		})
	})
})

