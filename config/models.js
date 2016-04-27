var mongoose = require('mongoose');  

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       


var uri = 'mongodb://lr:afkid@ds019478.mlab.com:19478/lyonroute';

mongoose.connect(uri, options); 

var Schema = mongoose.Schema;  

var userSchema = mongoose.Schema({    
     token : String,     
     email: String,  
     hashed_password: String,    
     salt : String,  
     temp_str:String 
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
	details: String
});

console.log(mongoose.connection.readyState);

module.exports = mongoose.model('users', userSchema);
module.exports = mongoose.model('offers',offerSchema);