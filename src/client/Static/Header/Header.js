import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import ProfilePic from '../../assets/images/profilePic.jpg';
import auth from '../../Auth/Auth/Auth';

function Header(props) {
  const DivStyle = {
    backgroundImage: `url(${ProfilePic})`
  };

  return (
    <React.Fragment>
      {auth.isAuthenticated() && (
        <div className="badgeProfile" style={{ right: '0', position: 'absolute', margin: '10px' }}>
          <div id="circleAvatar" />
          <div id="badgeInformation">
            <span id="logged-as-text">Logged as:</span>
            <br />
            {auth.getProfile().email}
            <br />
            <button
              className="btn btn-dark"
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
      <Link className="navbar-brand" to="/">
        <Grid container spacing={0} alignItems="flex-end" justify="center">
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            <div className="circle profilePicHeader" style={DivStyle} />
            <span className="profileTitle">Dashboard</span>
            <br />
            <span className="profileSubtitle">Easily manage your node project.</span>
          </Grid>
        </Grid>
      </Link>
    </React.Fragment>
  );
}

export default Header;
