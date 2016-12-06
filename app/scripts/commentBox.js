import React from 'react';
import $ from 'jquery';

import CommentList from './commentList';
import CommentForm from './commentForm';
import { store, ActionTools } from './flux'; 


module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount() {
        this.unsubscribe = store.subscribe(() => { //subscribe to the store's update message
            this.setState({ //compenent's state should be updated with the store data
                data: store.getState().data
            });
        });
    },
    componentWillUnmount: function() { //unsubscribie when component isn't being used (unmounted)
        this.unsubscribe();
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        store.dispatch(ActionTools.addComment(comment)); //dispatch call to the store (in flux.js)
    },
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
            );
    }
});