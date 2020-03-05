import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/imageUpload.css';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';


class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "",
    };
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        image,
        url: URL.createObjectURL(e.target.files[0]),
      });
      this.props.onImageUpload(image);
    }
  };


  render() {
    return (
      <div className="center">
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400" />       
        <div className="file-field input-field">
          <div className="btn transparent black-text">
            <span>File</span>
            <input type="file" onChange={this.handleChange} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.sessionState.authUser,
    image: state.postState.image,
  }
};


const mapDispatchToProps = dispatch => ({
  onImageUpload: image =>
    dispatch({ type: 'IMAGE_PREVIEW', image }),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withRouter,
)(ImageUpload);