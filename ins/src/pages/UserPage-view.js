import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Firebase';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/Routes';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import userImage from '../images/user.jpg';
//import PostCard from '../component/Post';


class UserPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisAuthUser: null,
            posts: null,
            urls: [],
            userToFollow: '',
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
                console.log(username);

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
            //console.log(posts);
            if (posts) {
                let urls = []
                Object.keys(posts).map((key) => {
                    //console.log(key)
                    let item = {
                        'pid': key,
                        'url': posts[key].imageUrl,
                    }
                    urls.push(item)
                })
                this.setState({ ...this.state, posts, urls })
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


    render() {
        const { thisAuthUser, urls,userToFollow } = this.state;
        console.log(this.state);
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser && thisAuthUser ?
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

                            {urls.length ?

                                <div>
                                    {urls.map(url => {
                                        return (
                                            <div className="col s12 m7 l4" key={url.pid}>
                                                <div className="card">
                                                    <div className="card-image">
                                                        <img src={url.url} height="300" width="500" />
                                                    </div>
                                                    <div className="row center">
                                                        <div className="card-action col">
                                                            <i className="material-icons">favorite_border</i>

                                                        </div>
                                                        <div className="card-action col">
                                                            <i className="material-icons">chat_bubble_outline</i>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                        </div>
                    </div>

                    : null}
            </AuthUserContext.Consumer>
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
