import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';


import TimeSlotBox from './timeSlotBox';

import '../css/base.css';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={TimeSlotBox}/>
	</Router>
), document.getElementById('content')
);
