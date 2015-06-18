var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var url = require('url');


exports.addProductToCart = function(req, res, next) {

request({
  uri: "http://192.168.59.103:32769/addproduct",
  method: "POST",
  form: {

   modelSize: (req.body.model + " talla " + req.body.size),
 
   amount: (req.body.amount),

   user: req.user.username

  }

}
, function(error, response, body) {
  console.log(body);
 res.render ('cart', {
	    		body: JSON.parse(body)
	    	});

});

return router;
	
};

exports.seeCart = function(req, res, next) {

request({
  uri: "http://192.168.59.103:32769/seecart",
  method: "POST",
  form: {


   user: req.user.username

  }

}
, function(error, response, body) {
  console.log(body);
 res.render ('cart', {
          body: JSON.parse(body)
        });

});

return router;
  
};

exports.closeCart = function(req, res, next) {

request({
  uri: "http://192.168.59.103:32769/closecart",
  method: "POST",
  form: {

   user: req.user.username

  }

}
, function(error, response, body) {
  console.log(body);
 res.render ('cart', {
          body: null
        });

});

return router;
  
};
// exports.deleteProduct = function(req, res, next) {



//   console.log(req.body.modelSize);
 
// request({
//   uri: "http://localhost:5000/deleteproduct",
//   method: "POST",
//   form: {

//    modelSize: (req.body.modelSize)

//   }

// }
// , function(error, response, body) {
//   console.log(body);
//  res.render ('cart', {
// 	    		body: JSON.parse(body)
// 	    	});

// });
// return router;
// };


