import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import Header from './components/header';
import BinsMain from './components/bins/bins_main';
import BinsList from './components/bins/bins_list';
import { Bins } from '../imports/collections/bins';

const routes = (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/bins/:binId" component={BinsMain} />
			</Switch>
		</div>
	</BrowserRouter>
);

Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});