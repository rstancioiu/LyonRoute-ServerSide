/**  
 * Module dependencies.  
 */ 
var express  = require('express'); 
var connect = require('connect'); 
var app      = express(); 
var port     = process.env.PORT || 8080; 
var bodyParser = require('body-parser'); 
// Configuration 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes   

var chgpass = require('./config/authentication/chgpass'); 
var register = require('./config/authentication/register'); 
var login = require('./config/authentication/login');   
var offer = require('./config/offers/offer');

var router = express.Router();

app.get('/', function(req, res) {          
	res.end("HAHAHA");    
});   

// ---------- CONNECTION --------
app.post('/login',function(req,res, next){        
		console.log(req);
	var email = req.body.email;             
	var password = req.body.password;       
	console.log(email);
	login.login(email,password,function (found) {           
	   console.log(found);             
	   res.json(found);    
	});    
});     

app.post('/register',function(req,res, next){         
	var email = req.body.email;             
	var password = req.body.password;       
	
	console.log(email);
	console.log(password);
	
	register.register(email,password,function (found) {             
	   console.log(found);             
	   res.json(found);    
	});   
});     

app.post('/api/chgpass', function(req, res, next) {       
	var id = req.body.id;                 
	var opass = req.body.oldpass;         
	var npass = req.body.newpass;       

	chgpass.cpass(id,opass,npass,function(found){           
	   console.log(found);             
	   res.json(found);    
	});     
});     

app.post('/api/resetpass', function(req, res, next) {         

	var email = req.body.email;         

	chgpass.respass_init(email,function(found){             
	   console.log(found);             
	   res.json(found);    
	});     
});     

app.post('/api/resetpass/chg', function(req, res, next) {         
	var email = req.body.email;         
	var code = req.body.code;       
	var npass = req.body.newpass;       

	chgpass.respass_chg(email,code,npass,function(found){           
	
		console.log(found);             
		res.json(found);    

	});     
});

// ----------- OFFER ROUTES -----------

app.post('/make_offer', function(req, res, next){  
	offer.make_offer(req, function(found){
		console.log(found);
		res.json(found);
	});
});

app.post('/update_offer', function(req, res, next){
	offer.update_offer(req, function(found){
		console.log(found);
		res.json(found);
	});
});

app.get('/all_offers', function(req, res){
	offer.all_offers(req, function(found){
		console.log(found);
		res.send(found);
	});
});

app.post('/remove_offer', function(req, res){
	offer.remove_offer(req, function(found){
		console.log(found);
		res.json(found);
	});
});

// ----------- USER ROUTES ---------


// ----------- SERVER --------------

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('GPWeb listening at http://%s:%s', host, port);

});