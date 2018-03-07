import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {
	componentWillMount() {
		this.page = 1;
	}

	handleButtonClick() {
		Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
		this.page += 1;
	}

	render() {
		return (
			<div className="text-center">
				<div className="employee-list">
					{this.props.employees.map(employee => 
						<EmployeeDetail key={employee._id} employee={employee} />
					)}
				</div>
				{/* add `.bind(this)` to bind contex because `handleButtonClick` is a callback */}
				<button onClick={this.handleButtonClick.bind(this)}
					className="btn btn-primary">
					Load More...
				</button>
			</div>
		);
	}
};

// Warning: createContainer was deprecated in react-meteor-data@0.2.13. 
// Use withTracker instead.
// https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage
export default withTracker(() => {
	// set up subscription
	Meteor.subscribe('employees', PER_PAGE);

	//return an object, whatever we return will be sent to
	// EmployssList as props
	return { employees: Employees.find({}).fetch() };
})(EmployeeList);