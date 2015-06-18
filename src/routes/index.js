var express = require('express');
var router = express.Router();

var productController = require('../controllers/products_controller');
var cartController = require('../controllers/cart_controller');

//Ordenación del catalogo
router.get('/catalogo/priceasc', productController.isAuthenticated, productController.sortProducts);
router.get('/catalogo/pricedesc', productController.isAuthenticated, productController.sortProducts);
router.get('/catalogo/size', productController.isAuthenticated, productController.sortProducts);
router.get('/catalogo', productController.isAuthenticated, productController.sortProducts);

//Carrito
router.post('/catalogo/addToCart', productController.isAuthenticated, cartController.addProductToCart);
router.get('/cart/closecart', productController.isAuthenticated, cartController.closeCart);
router.get('/cart', productController.isAuthenticated, cartController.seeCart);
	

//Busqueda
router.post('/catalogo/busqueda', productController.isAuthenticated, productController.searchProduct);



module.exports = function(app, passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});



		router.get('/error', function(req, res) {
    	
		res.render('error', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/catalogo',
		failureRedirect: '/',
		failureFlash : true  
	}));

	 //GET Registration Page 
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', productController.isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





