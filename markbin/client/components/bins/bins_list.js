import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Link } from 'react-router-dom';

class BinsList extends Component {
	onBinRemove(bin) {
		Meteor.call('bins.remove', bin);
	}

	renderList() {
		return this.props.bins.map(bin => {
			const url = `/bins/${bin._id}`;
			return (
				<li className="list-group-item" key={bin._id}>
					<Link to={url}>Bin {bin._id}</Link>
					<span className="pull-right">
						<button
							className="btn btn-danger"
							onClick={() => this.onBinRemove(bin)}>
							Remove
						</button>
					</span>
				</li>
			);
		});
	}

	render() {
		// console.log(this.props.bins);
		return (
			<ul className="list-group">
				{this.renderList()}
			</ul>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('bins');
	Meteor.subscribe('sharedBins');

	return { bins: Bins.find({}).fetch() };
})(BinsList);