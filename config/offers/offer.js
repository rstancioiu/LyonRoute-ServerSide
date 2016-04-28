var offer = require('../models').offers;

exports.make_offer = function(req, callback){

	var newoffer = new offer({    
		driverName: req.body.driverName,
		driverAge : req.body.driverAge,
		driverRating : req.body.driverRating,
		fullDate: req.body.fullDate,
		from: req.body.from,
		to : req.body.to,
		fullDuration : req.body.fullDuration,
		seatsAvailable : req.body.seatsAvailable,
		car : req.body.car,
		details: req.body.details
	});  
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
		var userMap = {};
		offers.forEach(function(offer){
			userMap[offer._id] = offer;
		});
		callback(userMap);
	});
}

exports.remove_offer = function(req, callback){
	offer.remove({_id : req.body._id} , function(err, removed){
		if(err) callback({'response' : "The operation failed"});
		else callback({'response': "Operation successfull"});
	});
}