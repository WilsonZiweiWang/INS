import React, { Component } from 'react';
import { withAuthorization } from '../Firebase';
import { AuthUserContext } from '../Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
//import PostCard  from '../component/Post';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const { authUser } = this.props;

        let UserPost = [];
        let username;
        const followingRef = this.props.firebase.user(authUser.uid).child('following');
        followingRef.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).map(key => {
                    const postsRef = this.props.firebase.user_posts(data[key]);//following user id
                    this.props.firebase.user(data[key]).on('value', function (snapshot) {//get username
                        username = snapshot.val().username || 'Anonymous';
                    })
                    postsRef.on('value', snapshot => {
                        let post = {};
                        if (snapshot.val()) {
                            Object.keys(snapshot.val()).map(post_key => {
                                post = {
                                    'username': username,
                                    'pid': post_key,
                                    'imageUrl': snapshot.val()[post_key].imageUrl,
                                }
                                UserPost.push(post);
                            })
                        }
                    })
                })
                this.setState({
                    posts: UserPost
                })
            }
        });
    }

    render() {
        const { posts } = this.state;
        const allPosts = posts.length ? (posts.map(item => {
            return (
                <div className='container center' key={item.pid}>
                    <PostCard imageUrl={item.imageUrl} author={item.username} />
                </div>
            )
        })) : (<div>No Post</div>)

        return (
            <AuthUserContext.Consumer>
                {authUser => authUser ?
                    <div className="container center" >
                        {allPosts}
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
    }
};

const PostCard = ({ imageUrl, author }) => (
    <div className="row">
        <div className="card s12 m7 l4">
            <div className="card-content">
                <h6 className="left">{author}</h6>
                <img src={imageUrl || "https://via.placeholder.com/400x300"} height="300" width="300" ></img>
                <br />
                <br />
                <div className='divider'></div>
                <div className="row center">
                    <div className="col l6">
                        <button className="btn-flat tooltipped" data-position="top" data-tooltip="Like">
                            <i className="material-icons black-text">
                                favorite_border
                            </i>
                        </button>
                    </div>
                    <div className="col l6">
                        <button className="btn-flat tooltipped" data-position="top" data-tooltip="Comment">
                            <i className="material-icons black-text">
                                chat_bubble_outline
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


export default compose(
    connect(mapStateToProps),
    withAuthorization(condition),
)(HomePage);
