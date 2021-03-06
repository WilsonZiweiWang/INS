import React, { Component } from 'react';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import '../styles/AddpostView.css';

import '../styles/AddpostView.css';
import ImageUpload from '../component/ImageUpload';

import { AuthUserContext, withAuthorization } from '../Firebase';



class AddPostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }

    }

    handleTextChange = (e) => {
        //this.props.onTextChange(e.target.value);
    }

    handlePost = (e) => {
        e.preventDefault();
        const { image, authUser, text } = this.props;
        const postData = {
            //data in here can't be reference
            //author: username,
            uid: authUser.uid,
            imageUrl: null,
            imageName: image.name,
            text,
            comment_count: 0,

        }
        //generate random key 
        var newPostKey = this.props.firebase.db.ref().child('posts').push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + authUser.uid + '/' + newPostKey] = postData;
        //update to FB
        this.props.firebase.db.ref().update(updates);
        const uploadTask = this.props.firebase.storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                this.props.firebase.storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.props.firebase.db.ref(`user-posts/${authUser.uid}/${newPostKey}`).update({ imageUrl: url });
                        this.props.firebase.db.ref(`posts/${newPostKey}`).update({ imageUrl: url });

                        this.props.history.push('/account');
                    });
            }
        );
        //when success (need to make sure)
        alert('Image posted, you will be redirected to your account page shortly...');

    }
    render() {
        const { image } = this.props;
        const isInvalid = image == null;
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser ?
                    <div>
                        <div className="container"  >
                            <div className='card  s12 m6' id='addpost-view'>
                                <div className='card-content center'>
                                    <ImageUpload />
                                    <form className='input-field'>
                                        {/* <label>Say something...</label>
                                        <input type='text' onChange={this.handleTextChange} value={text} /> */}

                                        <button onClick={this.handlePost} className="btn transparent black-text" disabled={isInvalid}>
                                            POST
                                        <i className="material-icons right">
                                                check
                                        </i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <footer className="page-footer transparent" style={{ 'marginTop': '3%' }}>
                            <div className="footer-copyright">
                                <div className="container black-text">
                                    © 2020 Copyright NIS
                            <div className="black-text text-lighten-4 right">Powered by <a href='https://reactjs.org/' className="blue-text">React</a></div>
                                </div>
                            </div>
                        </footer>
                    </div>

                    : null}

            </AuthUserContext.Consumer>
        )
    }




}

const condition = authUser => !!authUser;

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        text: state.postState.text,
        image: state.postState.image,
        imageUrl: state.postState.imageUrl,
        author: state.sessionState.username,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTextChange: (text) => dispatch({ type: 'TEXT_CHANGE', text }),
    }
};


export default compose(
    withAuthorization(condition),
    connect(mapStateToProps, mapDispatchToProps),
)(AddPostView);
