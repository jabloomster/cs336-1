/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// Note that native HTML element names start with a lowercase letter, 
// while custom React class names begin with an uppercase letter.

import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './commentBox';
import CommentEdit from './commentEdit';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import '../css/base.css';


ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={CommentBox}/>
		<Route path="/:id" component={CommentEdit} />
	</Router>
    ),document.getElementById('content')
);