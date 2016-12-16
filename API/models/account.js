
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let passportLocalMongoose = require('passport-local-mongoose')


var Account = new Schema( {
	username: String,
	password: String
})

Account.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', Account)

