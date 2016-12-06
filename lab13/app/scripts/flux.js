import $ from 'jquery';
import { createStore } from 'redux';

import { API_URL, POLL_INTERVAL } from './global';

let StoreTools = {
	dispatchLoadingComments: function () {
		store.dispatch(ActionTools.loadingComments());
	},
	startLoadingComments: function() {
		this.dispatchLoadingComments();
		setInterval(this.dispatchLoadingComments, POLL_INTERVAL);
	},
	findComment: function(id, commentList) {
		for (var comment of commentList) {
			if (comment.id == id) {
				return { id: id, author: comment.author, text: comment.text };
			}
		}
		return { id: '',  author: '', text: '' };
	}
};

// | These functions will receive a comment object
// | (with values for author, title and, potentially, id)
// | and create an appropriate action specification.
// |
// | Action -> Dispatcher -> Reducer -> 
let ActionTools = {
	addComment: function(comment) {
		return {
			type: 'ADD_COMMENT',
			comment: comment
		};
	},
	editComment: function(id, comment) {
		return {
			type: 'EDIT_COMMENT',
			id: id,
			comment: comment
		};
	},
	deleteComment: function(id) {
		return {
			type: 'DELETE_COMMENT',
			id: id
		};
	},
	loadingComments: function() {
		return {
			type: 'LOADING_COMMENTS'
		};
	},
	return {
		type: 'LOADED_COMMENTS',
		comments: comments
	};
};

// Reducers modify the store’s state and, in our application, update the database. 
let Reducers = {

	loadingComments: function() {
		$.ajax({
			url: API_URL,
			dataType: 'json',
			cache: false,
		})
		.done(function(result){
			store.dispatch(ActionTools.loadedComments(result));
		}.bind(this))
		.fail(function(xhr, status, errorThrown) {
			console.error(this.props.url, status, errorThrown.toString());
		}.bind(this));
	},
	addComment: function(action) {
		$.ajax({
			url: API_URL,
			dataType: 'json',
			type: 'POST',
			data: action.comment,
		})
		.done(function(result){
                // Do nothing; the comment is optimistially displayed
                // already and will refresh on the next poll.
            }.bind(this))
		.fail(function(xhr, status, errorThrown) {
			console.error(API_URL, status, errorThrown.toString());
		}.bind(this));
	},
	editComment: function(action) {
		$.ajax({
			url: API_URL + "/" + action.id,
			dataType: 'json',
			type: 'PUT',
			data: action.comment
		})
		.done(function(comments){
                // Do nothing; the comment is optimistially displayed
                // already and will refresh on the next poll.
            }.bind(this))
		.fail(function(xhr, status, errorThrown) {
			console.error(API_URL, status, errorThrown.toString());
		}.bind(this));
	},
	deleteComment: function(action) {
		$.ajax({
			url: API_URL + "/" + action.id,
			type: 'DELETE',
		})
		.done(function(comments){
                // Do nothing; the comment is optimistially displayed
                // already and will refresh on the next poll.
            }.bind(this))
		.fail(function(xhr, status, errorThrown) {
			console.error(API_URL, status, errorThrown.toString());
		}.bind(this));
	}
};

// Disapatcher: receives action requests and calls the appropriate reducer.
function commentsApp(state, action) { 
	switch (action.type) {
        // Switchboard entries that connect a dispatched action to its reducer
        case 'ADD_COMMENT':
        Reducers.addComment(action);
        return state;
        case 'EDIT_COMMENT':
        Reducers.editComment(action);
        return state;
        case 'DELETE_COMMENT':
        Reducers.deleteComment(action);
        return state;
        case 'LOADING_COMMENTS':
        Reducers.loadingComments();
        return state;
        case 'LOADED_COMMENTS':
        // inserting the comment list passed with the action parameter into the new returned state. 
        // so there is no reducer for this one cuz its implimented here.
        return { data: action.comments };
        default:
        return state;
    }
};

// the store, or application state
let defaultState = {
	data:[] //an empty list of comment objects
};

let store = createStore(commentsApp, defaultState);

module.exports = { StoreTools, ActionTools, store }