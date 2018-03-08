import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function() {
  	return Links.find({});
  });
});

// Executed whenever a user visits a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
	// Take the token out of the url and try to find a
	// matching link in the Links collection
	const link = Links.findOne({ token: req.params.token });

	if (link) {
		// If we find a link object, redirect the user to the
		// long url
		Links.update(link, { $inc: { clicks: 1 } });
		res.writeHead(307, { 'Location': link.url })	// 307: redirect request
		res.end();
	} else {
		// If we don't find a link object, send the user
		// to our normal React app
		next();
	}
}

// ConnectRoute() creates a middleware that will take
// an incoming HTTP request, if the incoming request matches
// the form '/anything', it will then execute the function

// localhost:3000/	NO MATCH
// localhost:3000/books/harry_potter	NO MATCH
// localhost:3000/abcd	will match!!

const middleware = ConnectRoute(function(router) {
	router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
