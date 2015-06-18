module.exports = function(app) {

var Kart = require('../models/kart.js');


var time_to_expire = 300;
var redis = require("redis"),
    client = redis.createClient('6379', 'redis');

exports.seeKart = function(req, res){
	console.log("GET /seecart")
	client.hgetall('kart.' + req.body.user, function(err, objs) {

if(!objs) {
    res.statusCode = 404;
    res.send({ error: 'Not cart yet!!' });
  } 

if(!err) {
    res.send(objs);

  } else {
    res.statusCode = 500;
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send(objs);
  }

});
};

addProductToKart = function(req, res) {
  console.log("POST /addproduct  || params: id, amount")
  var key = 'kart.' + req.body.user;
  if ( (!req.body.modelSize)){
    res.statusCode = 404;
    res.send("Error. You need model and size in the body.");
                console.log('Error en size or model');
  } else {

        client.hmset(key, req.body.modelSize, req.body.amount, function(err, result) {

      if (err) {
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                res.send('Internal error(%d): %s',res.statusCode,err.message);

    } else {
                console.log('product added to cart!');
                res.statusCode = 200;

                	client.hgetall('kart.' + req.body.user, function(err, objs) {
                		console.log(objs);

						if(!objs) {
						    res.statusCode = 404;
						    res.send({ error: 'Not cart yet!!' });
						  } 

						if(!err) {
						    res.send(objs);

						  } else {
						    res.statusCode = 500;
						    console.log('Internal error(%d): %s',res.statusCode,err.message);
						    res.send(objs);
						  }

					});
                
               
            } 
        });

        client.expire('kart.' + req.body.user, time_to_expire);


    }
  
};

seeKart = function(req, res){
	console.log("GET /seecart")
	client.hgetall('kart.' + req.body.user, function(err, objs) {

if(!objs) {
    res.statusCode = 404;
    return res.send({ error: 'Not cart yet!!' });
  } 

if(!err) {
    res.send(objs);

  } else {
    res.statusCode = 500;
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send(objs);
  }

});
};

deleteProductToKart = function(req, res){
	console.log(req.body.modelSize)
	client.hdel('kart.' + req.body.user, req.body.modelSize
		, function(err, product) {
if(product == 0) {
    res.statusCode = 404;
    return res.send({ error: 'Not found' });
  } 
if(!err) {
	client.hgetall('kart.' + req.body.user, function(err, objs) {

if(!objs) {
    res.statusCode = 404;
    return res.send({ error: 'Not cart yet!!' });
  } 

if(!err) {
    res.send(objs);

  } else {
    res.statusCode = 500;
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send(objs);
  }

});
  } else {
    res.statusCode = 500;
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: 'Server error' });
  }

});
};

closeKart = function(req, res){
  console.log('POST - /closeKart');
  var productsToKart = [];
  client.del('kart.' + req.body.user, function(err, products) {
    if(!products) {
        res.statusCode = 404;
        return res.send({ error: 'Not found. Probably your sessions expired.' });
      } 
    if(!err) {
      for(var key in products) {
        var product = {
          modelSize : key,
          amount: products[key]
        };
        productsToKart.push(product);
      }
        client.hgetall('kart.' + req.body.user, function(err, objs) {

          if(!objs) {
              res.statusCode = 404;
              return res.send({ error: 'Not cart yet!!' });
            } 

          if(!err) {
              res.send(objs);

            } else {
              res.statusCode = 500;
              console.log('Internal error(%d): %s',res.statusCode,err.message);
              res.send(objs);
            }

          });

      var kart = new Kart({
        user_id: req.body.user,
        kart: productsToKart
      });
      kart.save(function(err) {
        if(!err) {
          console.log("Kart " + kart.id + " created");
          client.expire('kart.' + req.body.user, 1);
          //res.send({ status: 'OK', kart:kart });
        } 
        else {
          res.statusCode = 500;
          //res.send({ error: 'Server error' });
        }  
      });
    } else {
      res.statusCode = 500;
      console.log('Internal error(%d): %s',res.statusCode,err.message);
      //res.send({ error: 'Server error' });
    }
  });
};

listOfClosedKarts = function(req, res) {
    console.log("GET - /listofclosedcarts");
    Kart.find(function(err, karts) {
      if (karts.length == 0) {
        res.statusCode = 404;
        return res.send({ error: 'Not found. Probably not carts yet.' });  
      }
      if(!err) {
        res.send(karts);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        res.send({ error: 'Server error' });
      }
    });
  };

app.post('/addproduct', addProductToKart);
app.post('/seecart', seeKart);
app.post('/deleteproduct', deleteProductToKart);
app.post('/closecart', closeKart);
app.get('/listofclosedcarts', listOfClosedKarts);
}