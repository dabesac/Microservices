


//======================================================================================
module.exports = function(app) {

  var Tshirt = require('../models/tshirt.js');



  //GET - Return a Tshirt with specified ID
  findByModel = function(req, res) {
    console.log("GET - /tshirt/:id");
    return Tshirt.findOne({ model:req.body.model }, function(err, tshirt) {
      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, tshirt { tshirt values }}
        return res.send({ tshirt:tshirt });
        // Send {tshirt values}
        // return res.send(tshirt);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  //Link routes and functions
  app.post('/busqueda', findByModel);


}