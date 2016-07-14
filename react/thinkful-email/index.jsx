//var React = require('react'),
//    ReactDOM = require('react-dom'),
//    ReactRouter = require('react-router');
"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

//var Router = ReactRouter.Router,
//    Route = ReactRouter.Route,
//    IndexRoute = ReactRouter.IndexRoute,
//    Link = ReactRouter.Link,
//    hashHistory = ReactRouter.hashHistory;

//  -------------------------------------------------------------------

const App = React.createClass({
  render() {
    return (
        <div>
          <h1>Email App</h1>
          <div id='sidebar'>
            <Link to={'/inbox'}>Inbox</Link>
            &nbsp;
            <Link to={'/spam'}>Spam</Link>
          </div>
          {this.props.children}
        </div>
    );
  }
});

//  -------------------------------------------------------------------

const Inbox = React.createClass({
  render() {
    const emails = EMAILS['inbox'];
    return (
      <div>
        <h2>Inbox</h2>
        <EmailList emails={emails} box='inbox' />
        {this.props.children}
      </div>
    );
  }
});

const Spam = React.createClass({
  render() {
    const emails = EMAILS['spam'];
    return (
      <div>
        <h2>Spam</h2>
        <EmailList emails={emails} box='spam' />
        {this.props.children}
      </div>
    );
  }
});


//  -------------------------------------------------------------------

//var EmailListContainer = React.createClass({
//  render() {
//    return <EmailList emails={this.props.emails} />;
//  }
//});

const EmailList = React.createClass({
  render() {
    const props = this.props;
    const emails = Object.keys(props.emails).map(function(emailId, index) {
      const email = props.emails[emailId];
      return (
        <li key={index}>
          <EmailLine email={email} box={props.box} />
        </li>
      );
    });
    return (
      <ul>
        {emails}
      </ul>
    );
  }
});

const EmailLine = React.createClass({
  render() {
    return (
      <Link to={'/' + this.props.box + '/' + this.props.email.id} className='email-line'>
        <strong>From: </strong>{this.props.email.from} <strong>Subject: </strong><em>{this.props.email.title}</em>
      </Link>
    );
  }
});

//  -------------------------------------------------------------------

const EmailContainer = React.createClass({
  render() {
    const path = this.props.routes[1].path;
    const email = EMAILS[path][this.props.params.emailId];
    return <Email email={email} />
  }
});

const Email = React.createClass({
  render() {
    return (
      <div className='email'>
        <h2>{this.props.email.title}</h2>
        <p>From: <em>{this.props.email.from}</em></p>
        <p>To: <em>{this.props.email.to}</em></p>
        <p>{this.props.email.content}</p>
      </div>
    );
  }
});

//  -------------------------------------------------------------------

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='inbox' component={Inbox} >
        <Route path=':emailId' component={EmailContainer} />
      </Route>
      <Route path='spam' component={Spam} >
        <Route path=':emailId' component={EmailContainer} />
      </Route>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  render(routes, document.getElementById('main'));
});

var EMAILS = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
};
