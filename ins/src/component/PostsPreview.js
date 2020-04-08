import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';


class PostsPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: "",
            postersUIDs: [],
            userIDs: [],
            imgUrls: []
        };


    }

    componentDidMount() {
        this.retrieveAllPostData();
    }

    // SECTION : function that retrieves all the images URLs
    retrieveAllPostData = () => {
        // clear image
        this.setState({ postersUIDs: [], imgUrls: [], userIDs: [] })
        var postData = this.props.firebase.retrieveAllPostData();
        var IMGs = postData[0]
        var PIDs = postData[1]
        var UIDs = postData[2]
        this.setState({ postersUIDs: PIDs, imgUrls: IMGs, userIDs: UIDs })


    }

    showComment() {
        alert("Hello! I am an alert box!!");
    }

    showPosts = () => {
        let images = []

        // Outer loop to create parent
        for (let i = 0; i < this.state.postersUIDs.length; i++) {
            images.push(<PostPreview pid={this.state.postersUIDs[i]} uid={this.state.userIDs[i]} imgUrl={this.state.imgUrls[i]} />)
        }
        return images
    }

    render() {
        return (
            <div className="container center">
                {
                    this.showPosts()
                }
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter,
)(PostsPreview);
