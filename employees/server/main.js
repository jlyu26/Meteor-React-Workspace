// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
	// Great place to generate data

	// Check to see if data exist in the collection
	// See if the collection has any records
	// ↓↓↓ Return the number of records that are currently saved in this collection
	const numberRecords = Employees.find({}).count();
	console.log(numberRecords);	// console.log() in server directory, log will be in terminal
	if (!numberRecords) {
		// Generate some data...
		_.times(5000, () => {	// Run the function 5000 times
			const { name, email, phone } = helpers.createCard();

			Employees.insert({	// Insert to MongoDB
				name, email, phone,
				avatar: image.avatar()
			});
		});
	}

	Meteor.publish('employees', function(per_page) {
		return Employees.find({}, { limit: per_page });
	});
});