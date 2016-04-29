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
     email: String,  
     hashed_password: String,  
     token : String,     
     salt : String,  
     temp_str:String,
	 id: ObjectId
});  

var offerSchema = mongoose.Schema({
	driverName: String,
	driverAge : Number,
	driverRating : String,
	fullDate: Date,
	from: String,
	to : String,
	fullDuration : Number,
	seatsAvailable : Number,
	car : String,
	details: String,
	id: ObjectId
});

var users = mongoose.model('users', userSchema);
var offers = mongoose.model('offers',offerSchema);

module.exports = {
	users : users,
	offers: offers
}