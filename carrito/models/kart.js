// /models/kart.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Kart = new Schema({
	kart : [
  		{ 	
  			//id:    	{ type: String, require: true },
  			//amount:   { type: Number, require: true },
  			modelSize:    	{ type: String, require: true },
   			//size:    	{ type: String, require: true },
   			amount:    	{ type: String, require: true }, 
   			//orden:    	{ type: String, require: true }, 			
  		}
  	],
  	user_id: { type: String, require:true},
  	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Kart', Kart);