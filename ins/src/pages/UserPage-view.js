import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Firebase';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/Routes';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import userImage from '../images/user.jpg';
import PostCard from '../component/post';


class UserPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            posts: null,
            urls: [],
        }
    }

    componentDidMount() {

        const { authUser } = this.props;
        const { uid } = authUser;
        if (authUser) {
            this.props.firebase.user(uid).once('value', snapshot => {
                //get the values that under column user with uid 
                const user = snapshot.val();
                this.setState({ ...this.state, user })
            });
        } else {
            this.setState({ ...this.state, user: null })
        }
        this.props.firebase.user_posts(uid).once('value', snapshot => {
            const posts = snapshot.val();
            //console.log(posts);
            if (posts){
                let urls = []
                Object.keys(posts).map((key) => {
                    urls = urls.concat(posts[key].imageUrl)
                })
                this.setState({ ...this.state, posts, urls })
            }

        });

    }

    // showImage = (url) => {
    //     return (<PostCard image={url} />)
    // }
    render() {
        const { user, urls } = this.state;
        // console.log('urls', urls);
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser && user ?
                    <div className='container' style={{ 'marginTop': '2%' }}>
                        <div name="header" className="row">
                            <img className='col l4' src={userImage}
                                alt="profilePhoto"
                                height="300"
                                width="400" />
                            <div className='col l8'>
                                <p>{user.username} </p>
                                <p>Self Description</p>
                                <NavLink to={ROUTES.SETTINGS} className='btn transparent'>
                                    <i className='material-icons black-text'>
                                        settings
                                </i>
                                </NavLink>
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='container row center'>

                            {urls.length ?

                                <div>
                                    {urls.map(url => {
                                        console.log(url)
                                        return (<img src={url} height="300" width="400" className="col s4" />)
                                        {/* this.showImage(url); */ }
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
