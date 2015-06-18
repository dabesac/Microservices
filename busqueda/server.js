
// Incluímos las dependencias que vamos a usar
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");

    
var engines = require('consolidate');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
// view engine setup
app.set('views', __dirname + '/views');
 
// Configuramos la app para que pueda realizar métodos REST
app.configure(function () {
  app.use(express.bodyParser()); // JSON parsing
  app.use(express.methodOverride()); // HTTP PUT and DELETE support
  app.use(app.router); // simple route management
});

routes = require('./routes/tshirts')(app);
 
// Conexión
mongoose.connect('mongodb://192.168.59.103:27017/tshirts', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});
 

 
// El servidor escucha en el puerto 3000
server.listen(8080, function() {
  console.log("Node server running on http://localhost:4000");
});