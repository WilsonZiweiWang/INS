import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import '../styles/imageUpload.css';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      url: "",
      progress: 0,
      text: '',
    };
    //this.handleImageChange = this.handleImageChange.bind(this)
    //this.handleDescriptionTextChange = this.handleDescriptionTextChange.bind(this)
  }

  // // Uploading Image function
  // handleImageChange(event) {
  //   this.setState({
  //     file: URL.createObjectURL(event.target.files[0])
  //   })
  // }

  // Posting the Post (ie saving data of image and description to firebase)
  // post_image(event) {
  //   alert("Posting Information !");
  // }

  // cancel_post(event) {
  //   alert("Cancelling Post !");
  // }

  // When image description is changed
  handleDescriptionTextChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }

  // // Posting the Post Button
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.post_image();
  // }

  handleChange = (e) => {
    const setPosts = this.props.firebase.db.ref(`posts/${Math.floor(Math.random() * 10000)}`);
    console.log('set post', setPosts);
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        image,
        url: URL.createObjectURL(e.target.files[0]),
      });
      console.log(image);
    }

  };

  handleUpload = (e) => {
    e.preventDefault();
    //console.log('firebase', this.props.firebase);
    const { image, text } = this.state;
    const uploadTask = this.props.firebase.storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });

      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        // this.props.firebase.storage
        //   .ref("images")
        //   .child(image.name)
        //   .getDownloadURL()
        //   .then(url => {
        //     this.setState({ url });
        //   });
      }
    );

    const setPosts = this.props.firebase.db.ref(`posts/${Math.floor(Math.random() * 10000)}`);
    console.log('set post', setPosts);
    // setPosts.set({
    //   id: image.lastModified,
    //   name: image.name,
    // }).then(() => {
    //   console.log('set post complete');
    // });


  };

  render() {
    return (
      // <div className='center'>
      //   <img id="imgUploaded" className="imageSrc" src={this.state.file}/>
      //   <br></br>
      //   <span>File</span>
      //   <input id="imageButtonUpload" type="file" onChange={this.handleImageChange}/>

      //   <form className='form-AddPost' onSubmit={this.handleSubmit}>
      //   <label>Say something...</label>
      //   <input type='text' onChange={this.handleDescriptionTextChange} value={this.state.text}/>
      //   <button className="btn waves-effect waves-light black-text transparent" type="submit" name="action" onClick={this.handleUpload}>

      //       Post

      //       <i className='material-icons right '>
      //           check
      //       </i>
      //   </button>  
      //   </form>
      // </div>
      <div className="center">
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400" />
        <div className="row">
          <progress value={this.state.progress} max="100" className="progress" />
        </div>
        <br />
        <br />
        <br />
        <div className="file-field input-field">
          <div className="btn transparent black-text">
            <span>File</span>
            <input type="file" onChange={this.handleChange} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <br />
        <br />


        <form className='input-field'>
          <label>Say something...</label>
          <input type='text' onChange={this.handleDescriptionTextChange} value={this.state.text} />

          <button onClick={this.handleUpload} className="btn transparent black-text">
            POST
          <i className="material-icons right">
              check
          </i>
          </button>
        </form>
      </div>
    );
  }
}

// const MapStateToProps = (state) => {
//   return{
//     user : this.state.user
//   }
// }



export default compose(
  withFirebase,
  withRouter,
)(ImageUpload);