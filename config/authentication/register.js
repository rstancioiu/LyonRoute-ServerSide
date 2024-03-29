var crypto = require('crypto'); 
var rand = require('csprng'); 
var mongoose = require('mongoose'); 
var user = require('../models').users;    


exports.register = function(req,callback) {  
	var firstname = req.body.data.firstname;
	var lastname = req.body.data.lastname;
	var telnumber = req.body.data.telnumber;
	var address = req.body.data.address;
	var email = req.body.data.email;             
	var password = req.body.data.password; 

	console.log(email);
	var x = email; 
	if(!(x.indexOf('@')==-1)){ 
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 && password.match(/[0-9]/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {  

			var temp =rand(160, 36); 
			var newpass = temp + password; 
			var token = crypto.createHash('sha512').update(email +rand).digest("hex"); 
			var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");  

			var newuser = new user({   
				 firstname : firstname,
				 lastname : lastname,
				 telnumber : telnumber,
				 address: address,
				 email: email, 
				 hashed_password: hashed_password, 
				 token: token,        
				 salt :temp 
			});  
			
			console.log(newuser);

			user.find({email: email},function(err,users){  
				var len = users.length;  

				if(len == 0){   
					newuser.save(function (err) {   

					callback({"data":{'res': 0, 'response': "Succesfully registered"}});  // Succesfully registered

				}); 
				}else{    

					callback({"data":{'res': 1}});  // There is already an user with this email
				}
			});
		}else{      

			callback({"data":{'res': 2}});  // The password is invalid

		}
	}else{    

		callback({"data":{'res': 3}});  // Invalid e-mail address
	} 
} 