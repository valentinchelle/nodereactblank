import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '../../Static/Card/Card';
import auth from './Auth';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      disabled: false
    };
  }

  async authentification() {
    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    console.log(`Identification with :${formData}`);
    // formData.append('image', this.state.image, this.state.image.name);
    this.setState({
      disabled: true
    });

    await axios.post(`${process.env.API_URL}/auth/register`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });

    this.props.history.push('/login/');
  }

  updateEmail(value) {
    this.setState({
      email: value
    });
  }

  updateUsername(value) {
    this.setState({
      username: value
    });
  }

  updatePassword(value) {
    this.setState({
      password: value
    });
  }

  updateRepeatPassword(value) {
    this.setState({
      repeatPassword: value
    });
  }

  render() {
    return (
      <Grid
        container
        spacing={24}
        alignContent="center"
        alignItems="center"
        justify="center"
        direction="row"
      >
        <Grid item xs={3}>
          <div className="beforeForm" style={{ textAlign: 'center' }}>
            <h1>Hey, nice to meet you !</h1>
            <h2> Fill the form to join us.</h2>
          </div>
          <Card>
            <div className="card_body">
              <TextField
                style={{ width: '100%' }}
                id="outlined-name"
                label="Email"
                disabled={this.state.disabled}
                value={this.state.name}
                onBlur={(e) => {
                  this.updateEmail(e.target.value);
                }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                style={{ width: '100%' }}
                id="outlined-name"
                label="Username"
                disabled={this.state.disabled}
                onBlur={(e) => {
                  this.updateUsername(e.target.value);
                }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                style={{ width: '100%' }}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onBlur={(e) => {
                  this.updatePassword(e.target.value);
                }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                error={!(this.state.repeatPassword === this.state.password)}
                style={{ width: '100%' }}
                id="outlined-password-input"
                label={
                  this.state.repeatPassword === this.state.password
                    ? 'Repeat password'
                    : "Passwords don't match"
                }
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  this.updateRepeatPassword(e.target.value);
                }}
                margin="normal"
                variant="outlined"
              />
              <br />
              <p>
                By clicking Join Now, you agree to our
                {' '}
                <a href="#">User Agreement Policy</a>
                {' '}
and
                {' '}
                <a href="#">Cookie Policy</a>
.
              </p>
              <br />
              <button
                disabled={this.state.disabled}
                className="button button-extended"
                onClick={() => {
                  this.authentification();
                }}
              >
                JOIN NOW
              </button>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(Register);
