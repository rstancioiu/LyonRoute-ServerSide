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
		callback({"data" : {'response' : "Offer successfully registered", 'offer_id': newoffer._id}});
	});
}

exports.update_offer = function(req, callback){
	var query = {'_id': req.body._id};
	offer.update(query, {$set: {details: req.body.details}}, {upsert: true}, function(err,doc){
		callback({"data": {'response' : "Updated successfully"}});
	});
}

exports.all_offers = function(data, callback){
	var arrival = data.arrival;
	var departure = data.departure;
	var query = {'ride.arrival.name': arrival, 'ride.departure.name': departure};
	offer.find(query, function(err, offers){
		var userMap = [];
		offers.forEach(function(offer){
			userMap.push(offer);
		});
		var map = JSON.parse(JSON.stringify(userMap));
		callback({ "data": map});
	});
}

exports.remove_offer = function(req, callback){
	offer.remove({_id : req.body._id} , function(err, removed){
		if(err) callback({"data" : {'response' : "The operation failed"}});
		else callback({"data": {'response': "Operation successfull"}});
	});
}