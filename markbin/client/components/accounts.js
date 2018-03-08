import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class Accounts extends Component {
	// automatically called whenever this component is rendered
	componentDidMount() {
		// Render the Blaze accounts form then find the div we just
		// rendered in the 'render' method and place the Blaze accounts
		// form in that div
		// this.view: whenever we render a blaze template, it returns a reference to
		// the redered template, so that we can later on clean up the template
		this.view = Blaze.render(Template.loginButtons, 
			ReactDOM.findDOMNode(this.refs.container));
	}

	// automatically called whenever this component is about to
	// be removed from the screen
	componentWillUnmount() {
		// Go find the form we created and destroy them
		// We need to clean up those form ourselves
		Blaze.remove(this.view);
	}

	render() {
		return (
			<div ref="container"></div>
		);
	}
}

export default Accounts;