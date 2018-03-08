import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

// To update data for any Meteor method, we usually define the method
// inside the mase file that defines a collection that we wan to update
// with the Meteor method.

// We use `check()` to run a validation on a variable.
// If the variable passes the validation, check does nothing.
// If fails validation, you'll got kicked out of the function instantly
// and check() will shrow an JavaScript error which can be
// communicated back to the client, and we can show the
// error to users.

// To be more specific:
// We use `Match.Where()` to define a **custom** validator.
// If returns a truthy value from the inner function, then check passes.
// If inner function returns false, then `check()` throws an error.

Meteor.methods({
	'links.insert': function(url) {
		// validUrl.isUri(url) returns the URL if valid, if invalid return `undefined`
		check(url, Match.Where(url => validUrl.isUri(url)));

		// first generate a token
		// then save the tokan and url to database
		const token = Math.random().toString(36).slice(-5);
		Links.insert({ url, token, clicks: 0 });
	}
});

export const Links = new Mongo.Collection('links');