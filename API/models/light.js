

let mongoose = require('mongoose')
let Schema = mongoose.Schema


var LightSchema = new Schema( {
	username: String,
	sequence: Object
})

let Light = mongoose.model('Light', LightSchema)
module.exports = Light;

