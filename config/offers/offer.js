var offer = require('../models').offers;
var user  = require('../models').users;

exports.make_offer = function(req, callback){

	var data = req.body.data;


	var newoffer = new offer({    
		driverEmail: data.driverEmail,
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

exports.my_offers = function(email, callback){
	var query = {'driverEmail': email};
	offer.find(query, function(err, offers){
		if(err)
			callback({"data": []});
		var userMap = [];
		offers.forEach(function(offer){
			userMap.push(offer);
		});
		var map = JSON.parse(JSON.stringify(userMap));
		callback({ "data": map});
	});
}

var async = require('async');

exports.my_inscriptions = function(email, callback){
	console.log("Hello");
	var userMap = [];
	counter = 0;
	user.find({"email":email}).then(function(response){
		console.log(response[0]);
		return response[0].offers;
	}).then(function(response){
		console.log(response);
		var finalPromise = new Promise(function(resolve, reject){
			response.forEach(function(element){
				offer.findOne({"_id":element}, function(err, new_offer){
					userMap.push(new_offer);
					counter++;
					if(counter == response.length){
						resolve(userMap);
					}
					console.log(new_offer);
				})
			})
		});
		return userMap;
	}).then(function(response){
		var map = JSON.parse(JSON.stringify(response));
		callback({ "data": map});
	});
}

exports.confirm_offer = function(data, callback){
	var query1 = {'_id': data._id};
	var query2 = {'email': data.email};
	offer.findOne(query1, function(err, offers){
		if(err || offers==null) callback({"data": {'response': "Update failed"}});
		user.findOne(query2, function(err, users){
			if(err || users==null) callback({"data": {'response': "Update failed"}});
			var s = users.firstname+ " "+ users.lastname;
			console.log(offers);
			offers.ride.passengers.push({'name': s, 'email': data.email});
			offers.ride.seatsAvi = offers.ride.seatsAvi - 1;
			users.offers.push(offers._id);
			users.save();
			offers.save();
			callback({"data": {'response': "Updated successfully"}});
		});
	});
}

exports.all_offers = function(data, callback){
	var arrival = data.arrival;
	var departure = data.departure;
	var query = {'ride.arrival.name': arrival, 'ride.departure.name': departure};
	offer.find(query, function(err, offers){
		var userMap = [];
		offers.forEach(function(offer){
			if(offer.ride.seatsAvi>0){
				userMap.push(offer);
			}
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