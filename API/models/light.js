

let mongoose = require('mongoose')
let Schema = mongoose.Schema


var LightSchema = new Schema( {
	username: String,
	name: String,
	date: { type: Date, default: Date.now },
	sequence: Object
})

let Light = mongoose.model('Light', LightSchema)
module.exports = Light;

