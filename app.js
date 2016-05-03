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
var account = require('./config/account');

var router = express.Router();


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});


app.get('/', function(req, res) {          
	res.end("HAHAHA");    
});   

// ---------- CONNECTION --------
app.post('/login',function(req,res, next){       
	login.login(req, function (found) {           
	   console.log(found);             
	   res.json(found);    
	});    
});     

app.post('/register',function(req,res, next){    
	register.register(req,function (found) {             
	   console.log(found);             
	   res.json(found);    
	});   
});     

app.post('/api/chgpass', function(req, res, next) {       
	var email = req.body.data.email;                 
	var opass = req.body.data.oldpass;         
	var npass = req.body.data.newpass;      

	chgpass.cpass(email,opass,npass,function(found){           
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

app.post('/update_account', function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	var data = req.body.data;
	account.update_account(data, function(found){
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

app.post('/remove_offer', function(req, res, next){
	offer.remove_offer(req, function(found){
		console.log(found);
		res.json(found);
	});
});

app.post('/confirm_offer', function(req, res, next){
	offer.confirm_offer(req.body.data, function(found){
		console.log(found);
		res.json(found);
	})
});

app.get('/all_offers/:departure/:arrival', function(req,res){
	var data = {
		"arrival" : req.params.arrival,
		"departure": req.params.departure
	}
	offer.all_offers(data, function(found){
		res.json(found);
	});
});


// ----------- USER ROUTES ---------


// ----------- GOOGLE MAPS TESTS ---
var distance = require('google-distance');

app.get('/test', function(req,res){
	distance.get(
	{
		origin: 'San Francisco, CA',
		destination: 'San Diego, CA'
	},
	function(err, data){
		if(err) return console.log(err);
		console.log(data);
	});
	distance.get(
	{
		origin: '37.772886,-122.423771',
  		destination: '37.871601,-122.269104'
	},
	function(err, data){
		if(err) return console.log(err);
		console.log(data);
	});

});


// ----------- SERVER --------------

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('GPWeb listening at http://%s:%s', host, port);

});