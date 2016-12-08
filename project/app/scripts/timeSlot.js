import React from 'react';
import Remarkable from 'remarkable';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import { API_URL } from './global';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: '', email: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handleUpdate: function() {
    var my_name = this.state.name.trim();
    var my_email = this.state.email.trim();
    if (!my_email || !my_name) {
      return;
    }
    var updatedTimeSlot = {
	  id: this.props.id,
	  name: my_name,
      email: my_email
    }
    $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedTimeSlot)
    })
    .done(function(timeSlots){
      //browserHistory.push('/');
      this.setState({name: '', email: ''});
    }.bind(this))
    .fail(function(xhr, status, errorThrown) {
      console.error(API_URL, status, errorThrown.toString());
    }.bind(this));
  },    
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    //var md = new Remarkable();
    return (
      <div className="timeSlot">
        <p className="timeSlotName">
          {this.props.date} {this.props.time} {this.props.name}
        </p>
    	{ this.props.filled ? null :          
		  	<form className="timeSlotForm">
			  <input
				type="text"
				placeholder="Your name"
				value={this.state.name}
				onChange={this.handleNameChange}
			  />
			  <input
				type="text"
				placeholder="Email"
				value={this.state.email}
				onChange={this.handleEmailChange}
			  />
			  <button type="button" onClick={this.handleUpdate}>Sign Up</button>
			</form>
		}
	  </div>
    );
  }
});
