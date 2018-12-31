import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { createHashHistory } from 'history';

class Auth {
  constructor() {
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult, step) {
    this.idToken = authResult.idToken;
    this.profile = authResult.profile;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    /* We save it in a session, when the browser is reloaded */
    sessionStorage.setItem('jwtToken', this.idToken);
  }

  async silentAuth() {
    const savedToken = sessionStorage.getItem('jwtToken');
    if (!savedToken || savedToken === '') {
      // if there is no token, dont bother
      return null;
    }

    await axios
      .post(`${process.env.API_URL}/Auth/silentAuth/`, { token: savedToken })
      .then((res, err) => {
        if (!err) {
          auth.setSession(res.data);
        } else {
          sessionStorage.removeItem('jwtToken');
        }
      });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    console.log('You need to be signed in..');
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    sessionStorage.removeItem('jwtToken');
    createHashHistory().push('/');
  }
}

const auth = new Auth();

export default auth;
