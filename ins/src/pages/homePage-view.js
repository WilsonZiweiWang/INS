import React, { Component } from 'react';
import { withAuthorization } from '../Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Popup from "reactjs-popup";
import PopUpPost from '../component/PopUpPost';

import ReactLoading from "react-loading";


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            done: undefined,
        }
    }

    componentDidMount() {
        const { authUser } = this.props;

        let UserPost = [];
        let username;
        const followingRef = this.props.firebase.user(authUser.uid).child('following');
        followingRef.once('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).map(key => {
                    const postsRef = this.props.firebase.user_posts(data[key]);//following user id
                    this.props.firebase.user(data[key]).once('value', function (snapshot) {//get username
                        username = snapshot.val().username || 'Anonymous';
                    })
                    postsRef.once('value', snapshot => {
                        let post = {};
                        if (snapshot.val()) {
                            Object.keys(snapshot.val()).map(post_key => {
                                post = {
                                    'username': username,
                                    'pid': post_key,
                                    'imageUrl': snapshot.val()[post_key].imageUrl,
                                    'uid': snapshot.val()[post_key].uid,
                                }
                                UserPost.push(post);
                            })
                        }
                    })
                })
                this.setState({
                    posts: UserPost,
                    done: true
                })
            }
        });
    }


    render() {
        const { posts } = this.state;

        const { authUser } = this.props;
        const allPosts = posts && posts.length ? (posts.map(item => {

            return (
                    <div className='container center' key={item.pid}>
                        <PostCard imageUrl={item.imageUrl} author={item.username} pid={item.pid} uid={item.uid}/>
                    </div>
            )

        })) : (null)

        return (
            <div>
                {authUser && this.state.done ?
                    <div className="container center" >
                        {allPosts}
                    </div>
                    :
                    <div className="center" style={{ 'marginLeft': '50%', 'marginTop': '20%' }} >
                        <ReactLoading type={"bars"} color={"black"} />
                    </div>}
            </div>
        )
    }
}

const condition = authUser => !!authUser;

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
    }
};

const PostCard = ({ imageUrl, author , pid, uid}) => (
    <div className="row">
        <div className="card s12 m7 l4">
            <div className="card-content">
                <h6 className="left">{author}</h6>
                <img src={imageUrl || "https://via.placeholder.com/400x300"} alt="postimage" height="300" width="300" ></img>
                <br />
                <br />
                <div className='divider'></div>
                <div className="row center">
                    <div className="center">

                    <Popup trigger = {

                        <button className="btn-flat tooltipped" data-position="top" data-tooltip="Comment">
                            <i className="material-icons black-text">
                                chat_bubble_outline
                            </i>
                        </button> 
                        }

                    position="right center"     
                    modal
                    closeOnDocumentClick>
                        
                        <PopUpPost pid={pid} uid={uid} imgUrl={imageUrl}/>

                    </Popup>

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
