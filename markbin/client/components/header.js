import React, { Component } from 'react';
import Accounts from './accounts';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
	onBinClick(event) {
		event.preventDefault();

		Meteor.call('bins.insert', (error, binId) => {
			this.props.history.push(`/bins/${binId}`);
		});
	}

	render() {
		return (
			<nav className="nav navbar-default">
				<div className="navbar-header">
					{/* 
						Instead of <a> we use <Link> in React because we'e not 
						navigating between different HTML pages, we're just showing/hidding different components 
					*/}
					<Link to="/" className="navbar-brand">MarkBin</Link>
				</div>
				<ul className="nav navbar-nav">
					<li>
						<Accounts />
					</li>
					<li>
						<a href="#" onClick={this.onBinClick.bind(this)}>Create Bin</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default withRouter(Header);