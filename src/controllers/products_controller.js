var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var passport = require('passport');


exports.isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		next();
	}
	else{
	
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
    }
};



exports.sortProducts = function(req, res, next) {

	

	var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
	}

	//Step 2 - Configure the request 
	var options = {
	    url     : 'http://192.168.59.103:60000' + (req.path),
	    method  : 'GET',
	    jar     : true,
	    headers : headers
	}

	//Step 3 - do the request
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {

	    	res.render ('catalogo', {
	    		body:JSON.parse(body)
	    	});
	        
	    }
	    else {
	    	console.log(error);
	    }
	});
	
};

exports.searchProduct = function(req, res, next) {

	console.log(req.body.model)

request({
  uri: "http://192.168.59.103:50000/busqueda",
  method: "POST",
  form: {

   model: req.body.model

  }

}
, function(error, response, body) {
  console.log(body);
 res.render ('catalogo', {
	    		body: JSON.parse(body)
	    	});

});

return router;
	
};