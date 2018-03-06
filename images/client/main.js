// Any JS in here is automatically ran for us

// Import the React library
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageList from './components/image_list';

// Create a component
class App extends Component {
	constructor(props) {
		super(props);

		// Initialize state
		this.state = { images: [] };
	}

	componentWillMount() {	// mount: 安装
		// Only going to be called exactly one time
		// Fantastic place to load data
		// When complete the request, get component to rerender, use `state`
		axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
			.then(response => this.setState({ images: response.data.data }));
	}

	render() {
		return(
			<div>
				<ImageList images={this.state.images} />
			</div>
		);
	}
};

// Render this component to the screen
Meteor.startup(() => {
	ReactDOM.render(<App />, document.querySelector('.container'));
});
