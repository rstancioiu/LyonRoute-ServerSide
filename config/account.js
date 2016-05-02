var users = require('./models').users;

exports.update_account = function(data, callback){
	var query = {'email': data.email};
	users.update(query, 
		{$set: {
			firstname: data.firstname,
			lastname : data.lastname,
			telnumber: data.telnumber,
			address : data.address
		}}, 
		{upsert: true}, 
		function(err,doc){
			if(err) callback(
			{
				'data': {'response' : "Update failed"}
			});
			callback({'data':{'response' : "Updated successfully"}});
		}
	);
}
