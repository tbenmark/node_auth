// routing
module.exports = function(app,passport){

	// home page
	app.get('/', function(req,res) {
		res.render('index.ejs');
	});

	// login page
	app.get('/login', function(req,res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the login page
		failureFlash : true // allow flash messages
	}));

	// sign up
	app.get('/signup', function(req,res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true
	}));

	// profile
	// protected so only logged in users can visit this page
	app.get('/profile', isLoggedIn, function(req,res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of the session and pass to template
		});
	});

	// logout
	app.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure the user is logged in
function isLoggedIn(req,res,next) {

	// if user is authenticated in the session, then proceed
	if (req.isAuthenticated())
		return next();

	// if they aren't, redirect them back to the home page
	res.redirect('/');
}