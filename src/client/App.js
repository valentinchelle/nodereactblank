import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Article from './Articles/Article/Article';
import Articles from './Articles/Articles/Articles';
import NewArticle from './Articles/NewArticle/NewArticle';
import Callback from './Auth/Callback/Callback';
import SecuredRoute from './Auth/SecuredRoute/SecuredRoute';
import auth from './Auth/Auth/Auth';
import Login from './Auth/Auth/Login';
import Register from './Auth/Auth/Register';
import Header from './Static/Header/Header';
import Dashboard from './Admin/Global/Dashboard';

import './assets/dist/css/main.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

class App extends Component {
  async componentDidMount() {
    await auth.silentAuth();
    if (this.props.location.pathname === '/callback') return;
    this.forceUpdate();
    try {
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
    this.statVisit();
  }

  async statVisit() {
    await axios.post(
      `${process.env.API_URL}/stat/set-stat/`,
      {
        name: 'visits',
        value: '0'
      },
      {
        headers: { Authorization: `Bearer ${auth.getIdToken()}` }
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div style={{ padding: 20 }}>
          <Route
            exact
            path="/"
            component={(auth.isAuthenticated() && Dashboard) || (!auth.isAuthenticated() && Login)}
          />
          <Route exact path="/callback" component={Callback} />
          <Route exact path="/article/:articleId" component={Article} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <SecuredRoute exact path="/new-article" component={NewArticle} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
