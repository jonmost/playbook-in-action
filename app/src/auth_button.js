var React = require('react');
var AuthMixin = require('./auth_mixin');

function login(callback) {
  if(typeof callback !== 'function') {
    callback = function() { };
  }

  $.ajax({
    type: 'GET',
    url: '/api/token',
    dataType: 'json',
    success: function(data) {
      var token = data.token;
      $.ajax({
  			type: "GET",
  			url: "/api/token",
  			username: token,
  			password: 'none',
  			success: function() {
          callback(token);
        }
  		});
    },
    error: function() {
      callback(false);
    }
  });
}

function logout(callback) {
	$.ajax({
		type: "GET",
		url: "/api/token",
		username: "--invalid--",
		password: "--invalid--",
    complete: callback
	});
}

var AuthButton = React.createClass({
  mixins: [AuthMixin],

  getInitialState: function() {
    return {
      text: 'Log In'
    }
  },

  componentDidMount: function() {
    this.loginStateChanged();
  },

  loginStateChanged: function() {
    this.setState({ text: this.state.loggedIn ? 'Log Out' : 'Log In' });
  },

  click: function() {
    if(this.state.loggedIn) {
      logout(function() {
        this.setAuthenticationState(false);
      }.bind(this));
    } else {
      login(function(token) {
        if(token) {
          this.setAuthenticationState(true);
        } else {
          this.setAuthenticationState(false);
        }
      }.bind(this));
    }
  },

  hideButton: function() {
    return (
      (this.props.hideIfLoggedIn && this.state.loggedIn) ||
      (this.props.hideIfLoggedOut && !this.state.loggedIn)
    );
  },

  render: function() {
    return(
      <span className={this.props.className}>
        {this.hideButton() ? null : <button onClick={this.click}>{this.state.text}</button>}
      </span>
    );
  }
});

module.exports = AuthButton;