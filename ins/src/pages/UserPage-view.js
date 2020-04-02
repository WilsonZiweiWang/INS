import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Firebase';
import { Link, NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/Routes';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";

import userImage from '../images/user.jpg';
//import PostCard from '../component/Post';


class UserPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisAuthUser: null,
            posts: null,
            //urls: [],
            userToFollow: '',
            done: undefined,
        }
    }

    componentDidMount() {

        const { authUser } = this.props;
        const { uid } = authUser;
        var keys;
        var username;
        //initialize random users to follow

        this.props.firebase.users().on('value', snapshot => {
            let obj = snapshot.val();
            keys = Object.keys(obj);
            var randomUserId = keys[Math.floor(keys.length * Math.random())];
            //console.log(Math.floor(keys.length * Math.random()));
            this.props.firebase.user(randomUserId).on('value', function (snapshot) {//get username
                username = snapshot.val().username || 'Anonymous';

            })
            this.setState({
                ...this.state,
                userToFollow: {
                    'username': username,
                    'uid': randomUserId,
                }
            })
        })

        if (authUser) {
            console.log('program went here')
            this.props.firebase.user(uid).once('value', snapshot => {
                //get the values that under column user with uid 
                const user = snapshot.val();
                this.setState({ ...this.state, thisAuthUser: user })
            });
        } else {
            this.setState({ ...this.state, thisAuthUser: null })
        }
        this.props.firebase.user_posts(uid).once('value', snapshot => {
            const posts = snapshot.val();
            if (posts) {
                this.setState({ ...this.state, posts, done: true, })
            }
        });

    }

    handleFollow = (e) => {
        e.preventDefault();
        var updates = {};
        if (e.target.id) {
            updates['/users/' + this.props.authUser.uid + '/following/' + e.target.id] = e.target.id;
            this.props.firebase.db.ref().update(updates);
            alert('You are now following this user, go to home page to see their posts');
        }
    }

    handleDelete = (e) => {

        console.log(e.target);
        const pid = e.target.id;
        const { authUser } = this.props;
        if (pid) {
            //delete data from tables that contain this post
            const postRef = this.props.firebase.db.ref('/posts/' + pid).remove();

            const userPostRef = this.props.firebase.db.ref('/user-posts/' + authUser.uid + '/' + pid).remove();

            alert('Post has been deleted.')
        }
        window.location.reload(false);
    }


    render() {
        const { thisAuthUser, posts, userToFollow } = this.state;
        const { authUser } = this.props;
        //console.log(this.state);
        const PostComponent = posts && Object.keys(posts).length ?
            (<div>
                {Object.keys(posts).map(postKey => {
                    return (
                        <div className="col s12 m7 l4" key={postKey}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={posts[postKey].imageUrl} height="300" width="500" />
                                </div>
                                <div className="row center">
                                    <div className="card-action col">
                                        <i className="material-icons">favorite_border</i>

                                    </div>
                                    <div className="card-action col">
                                        <i className="material-icons">chat_bubble_outline</i>

                                    </div>

                                    <div className="card-action col right">
                                        <button className="btn-flat" onClick={this.handleDelete}>
                                            <i className="material-icons red-text" id={postKey}>
                                                delete
                                            </i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>)
            : null;
        return (
            <div>
                {authUser && thisAuthUser && this.state.done ?
                    <div>
                        <div className='container' style={{ 'marginTop': '2%' }}>
                            <div name="header" className="row">
                                <img className='col l4' src={userImage}
                                    alt="profilePhoto"
                                    height="300"
                                    width="400" />
                                <div className='col l8'>
                                    <p>{thisAuthUser.username} </p>
                                    <p>Self Description</p>
                                    <NavLink to={ROUTES.SETTINGS} className='btn transparent'>
                                        <i className='material-icons black-text'>
                                            settings
                                </i>
                                    </NavLink>
                                    <br />
                                    <br />
                                    <div className='divider'></div>
                                    <p>Follow to see their posts</p>
                                    <div className='col l2'>
                                        <p className='black-text'>{userToFollow.username}</p>
                                        <button id={userToFollow.uid} className='btn transparent black-text' onClick={this.handleFollow} >
                                            <i className='material-icons'>
                                                add
    
                                        </i>

                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className='divider'></div>
                            <div className='row center'>
                                {PostComponent}
                            </div>
                        </div>
                        <footer className="page-footer transparent" >
                            <div className="footer-copyright">
                                <div className="container black-text">
                                    © 2020 Copyright NIS
                            <div className="black-text text-lighten-4 right">Powered by <a href='https://reactjs.org/' className="blue-text">React</a></div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    :
                    <div className="center" style={{ 'marginLeft': '50%', 'marginTop': '20%' }} >
                        <ReactLoading type={"bars"} color={"black"} />
                    </div>
                }

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
    }
};

const condition = authUser => !!authUser;

export default compose(
    connect(mapStateToProps),
    withAuthorization(condition),
)(UserPageView);
