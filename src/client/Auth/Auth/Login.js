import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '../../Static/Card/Card';
import auth from './Auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: false,
      error: ''
    };
  }

  updateEmail(value) {
    this.setState({
      email: value
    });
  }

  updatePassword(value) {
    this.setState({
      password: value
    });
  }

  handleCloseError = (event, reason) => {
    this.setState({ error: '' });
  };

  async authentification() {
    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    console.log(`Identification with :${formData}`);
    // formData.append('image', this.state.image, this.state.image.name);
    this.setState({
      disabled: true
    });

    await axios
      .post(`${process.env.API_URL}/auth/login`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((res) => {
        auth.setSession(res.data);
        this.props.history.push('/');
      })
      .catch((error) => {
        if (error.response.data.error === 'Email') {
          this.setState({
            error: 'Wrong Email'
          });
          this.setState({
            disabled: false
          });
        } else if (error.response.data.error === 'Password') {
          this.setState({
            error: 'Wrong Password'
          });
          this.setState({
            disabled: false
          });
        }
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
        <Grid item lg={3} md={6} xs={12}>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={this.state.error != ''}
            autoHideDuration={3000}
            onClose={this.handleCloseError}
            className="error_snackbar"
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{this.state.error}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseError}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />

          <div className="beforeForm" style={{ textAlign: 'center' }}>
            <h1> Hey, good to see you again !</h1>
            <h2> Log in to get going. </h2>
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
              <br />
              <br />
              <button
                disabled={this.state.disabled}
                className="button button-extended"
                onClick={() => {
                  this.authentification();
                }}
              >
                Log In
              </button>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(Login);
