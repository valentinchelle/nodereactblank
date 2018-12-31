import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FroalaEditor from 'react-froala-wysiwyg';
import auth from '../../Auth/Auth/Auth';
import Card from '../../Static/Card/Card';
import UploadImageForm from '../../Utils/UploadImageForm';

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      content: '',
      image: null
    };
    this.updateImage = this.updateImage.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.user = auth.getProfile();
    this.configFroala = {
      placeholderText: 'Edit Your Content Here!',
      charCounterCount: false
    };
  }

  updateContent(value) {
    console.log(value);
    this.setState({
      content: value
    });
  }

  updateTitle(value) {
    this.setState({
      title: value
    });
  }

  updateImage(e) {
    this.setState({
      image: e.target.files[0]
    });
  }

  async submit() {
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('description', this.state.content);
    formData.append('image', this.state.image, this.state.image.name);
    this.setState({
      disabled: true
    });
    console.log(this.state.image);
    await axios.post(`${process.env.API_URL}/post-article/`, formData, {
      headers: {
        tokenAuthorization: `${auth.getIdToken()}`,
        'content-type': 'multipart/form-data'
      }
    });

    this.props.history.push('/');
  }

  render() {
    return (
      <Grid container spacing={24} alignContent="center" justify="center" direction="row">
        <Grid item xs={8}>
          <Card>
            <div className="card_body">
              <TextField
                style={{ width: '100%' }}
                id="outlined-name"
                label="Title"
                disabled={this.state.disabled}
                value={this.state.name}
                onBlur={(e) => {
                  this.updateTitle(e.target.value);
                }}
                margin="normal"
                variant="outlined"
              />
              <FroalaEditor
                disabled={this.state.disabled}
                tag="textarea"
                config={this.configFroala}
                model={this.state.content}
                onModelChange={this.updateContent}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Grid item xs={12}>
            <Card>
              <div className="card_header">Publish</div>
              <div className="card_body">
                Author:
                {this.user.email}
              </div>
              <div className="card_footer">
                <a href="#"> Move to Trash </a>
                <button
                  disabled={this.state.disabled}
                  className="button"
                  style={{ float: 'right' }}
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Submit
                </button>
                <br style={{ clear: 'both' }} />
              </div>
            </Card>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Card>
              <div className="card_header">Cover Image</div>
              <div className="card_body">
                <UploadImageForm onChange={this.updateImage} />
              </div>
            </Card>
          </Grid>
          <Grid />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(NewArticle);
