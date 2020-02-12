import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
//import DeletePost from '../actions/PostAction';

class Post extends Component {

    // componentDidMount(){
    //     console.log(this.props);
    //     let id = this.props.match.params.post_id;
    //     axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    //     .then(res => {
    //         this.setState({
    //             post: res.data
    //         })
    //     })
    // }

    HandleClick = () => {
        this.props.deletePost(this.props.post.id);
        //when post is deleted, redirect to the home page
        this.props.history.push('/');
    }

    render() {
        console.log('post props: ', this.props);
        const post = this.props.post ? (
            <div className='post-content container'>
                <span className='post-title'>{this.props.post.title}</span>
                <p className='post-content'>{this.props.post.body}</p>
                <div className='center'>
                    <button className="btn-floating btn-small grey darken-4" onClick={this.HandleClick}>
                        <i className="material-icons">delete</i>
                    </button>
                </div>
            </div>
        ) : (
                <div className='center'>
                    Oops! The post you are looking for is either deleted or does not exist .
            </div>
            )
        return (
            <div className='container'>
                {post}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {


    //the id above is String!!!
    //so do not use === inside the return()

    let id = ownProps.match.params.post_id;

    // console.log(id);
    // console.log(state.posts);

    return {
        post: state.posts.find((post) => {
            return post.id == id
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //dispatch is the function from redux store 

        // (id) here means this props requires an argument called id
        deletePost: (id) => { dispatch(DeletePost(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);