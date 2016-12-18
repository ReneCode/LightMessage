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

	function getTestData() {
		let l1 = {
			username:"11", 
			date:new Date(2010, 5, 2, 11, 44),
			sequence: {
				leds: [ { a:11, b:"abc"} ]
			}
		};
		let l2 = {
			username:"22", 
			date:new Date(2010, 5, 2, 11, 46),
			sequence: {
				leds: [ 
					{ a:22, b:"xyt", c:true},
					{ a:22, b:"xyz"} 
				],
				speed: 500
			}
		};
		let l3 = {
			username:"33", 
			date:new Date(2010, 5, 2, 11, 33),
			sequence: {
				leds: [ { a:33, b:"end"} ]
			}
		};

		return [ l1, l2, l3 ];
	}

	function createTestData(callback) {
		let data = getTestData();
		Light.create( data, (err, data) => {
			if (err) {
				callback(null)
			} else {
				callback(data);
			}
		})

	}

	// GET
	it ('should provide GET', function(done) {
		superagent.get(URL, function(err, res) {
			assert.ifError(err)
			done();
		})
	})

	it ('should get data from GET', function(done) {
		let data = getTestData();
		createTestData( result => {
			superagent.get(URL, function(err, res) {
				assert.equal(res.body.length, data.length)
				assert.deepEqual(data[0].sequence, res.body[0].sequence)
				done();
			});
		})
	})

	it ('should get one latest data from GET', function(done) {
		let data = getTestData();
		// data[1] has the newest data
		createTestData( (result) => {
			let url = URL + '/latest'
			superagent.get(url, function(err, res) {
				assert.isNotNull(res.body)
				assert.equal(res.body.username, data[1].username)
				assert.deepEqual(res.body.sequence, data[1].sequence)
				done();
			})
		});
	})

	

	// POST
	it ('should provide POST', function(done) {
		superagent.post(URL, {}, function(err, res) {
			assert.ifError(err)		
			done();
		})
	})

	it ('should return status 201 from POST', function(done) {
		let data = getTestData()
		superagent.post(URL)
		.set('Content-Type', 'application/json')
		.send(data[0])
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
		superagent.put(url, {}, (err, res) => {
			assert.equal(res.statusCode, 404)		
			done();
		})
	})

	it ('should update light PUT', function(done) {
		createTestData( data => {
			let id = data[0]._id;
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

		});
	})
})


