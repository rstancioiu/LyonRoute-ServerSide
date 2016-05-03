var mongoose = require('mongoose');  

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       


var uri = 'mongodb://lr:afkid@ds019478.mlab.com:19478/lyonroute';

mongoose.connect(uri, options); 

var Schema = mongoose.Schema;  
var ObjectId = Schema.ObjectId;

var userSchema = mongoose.Schema({    
	 firstname : String,
	 lastname : String,
	 telnumber: String,
	 address: String,
     email: {type: String, required: true, unique: true},  
     hashed_password: String,  
     token : String,     
     salt : String,  
     temp_str:String,
});  


var offerSchema = mongoose.Schema({
	driverEmail: {type: String},
	driverName: {type:String},
	driverAge : Number,
	driverRating : {type:String},
	driverCar : {type:String},
	frequency : [{type:String}],
	ride: {
		waypoints: [{name: {type:String}, lat: {type:String}, lng: {type:String}}],
		arrival: {name: {type:String}, lat: {type:String}, lng: {type:String}},
		departure: {name: {type:String}, lat: {type:String}, lng: {type:String}},
		date: Date,
		duration : {type:String},
		detour: {type:String},
		seatsAvi: {type:String},
		seats: {type: String},
		passengers : [{name: {type: String}, email : {type: String}}] 
	}
});

var users = mongoose.model('users', userSchema);
var offers = mongoose.model('offers',offerSchema);

module.exports = {
	users : users,
	offers: offers
}