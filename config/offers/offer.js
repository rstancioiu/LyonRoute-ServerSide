var offer = require('../models').offers;

exports.make_offer = function(req, callback){

	var data = req.body.data;


	var newoffer = new offer({    
		driverName: data.driverName,
		driverAge : data.driverAge,
		driverRating : data.driverRating,
		driverCar : data.driverCar,
		frequency : data.frequency,
		ride : {
			waypoints : data.ride.waypoints,
			arrival: data.ride.arrival,
			departure: data.ride.departure,
			date: data.ride.date,
			duration: data.ride.duration,
			detour: data.ride.detour,
			seatsAvi: data.ride.seatsAvi,
			seats: data.ride.seats,
			passengers: data.ride.passengers
		}
	});  
	console.log(newoffer);
	newoffer.save(function(err){
		callback({'response' : "Offer successfully registered", 'offer_id': newoffer._id});
	});
}

exports.update_offer = function(req, callback){
	var query = {'_id': req.body._id};
	offer.update(query, {$set: {details: req.body.details}}, {upsert: true}, function(err,doc){
		callback({'response' : "Updated successfully"});
	});
}

exports.all_offers = function(req, callback){
	offer.find({}, function(err, offers){
		var userMap = [];
		offers.forEach(function(offer){
			userMap.push(offer);
		});
		console.log(userMap);
		var map = JSON.parse(JSON.stringify(userMap));
		callback({ "data": map});
	});
}

exports.remove_offer = function(req, callback){
	offer.remove({_id : req.body._id} , function(err, removed){
		if(err) callback({'response' : "The operation failed"});
		else callback({'response': "Operation successfull"});
	});
}