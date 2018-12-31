import React from 'react';
import { withRouter } from 'react-router-dom';

const axios = require('axios');

class UploadImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeParent = props.onChange;
  }

  onChange = function (e) {
    this.onChangeParent(e);
    this.imageUrl = URL.createObjectURL(e.target.files[0]);
  };

  render() {
    return (
      <div>
        <div
          id="previewUploadImage"
          style={{
            backgroundImage: `url(${this.imageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <input
          type="file"
          name="myImage"
          onChange={(e) => {
            this.onChange(e);
          }}
        />
      </div>
    );
  }
}

export default UploadImageForm;
