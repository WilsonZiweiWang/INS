import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

class PopUpPost extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            userName: null,
        };

        this.posterID = this.props.pid;
        this.userID = this.props.uid;
        this.imgURL = this.props.imgUrl;
    }

    componentDidMount() {
        this.retrieveAllComments();
        this.retrieveUserName();
    }

    retrieveUserName = () => {
        var username
        this.props.firebase.db.ref('users/' + this.userID).on('value', function (snapshot) {
            username = snapshot.val().username;
            console.log(username)
            
        });
        this.setState({ username })
    }

    retrieveAllComments = () => {
        this.setState({ comments: [] })
        var commentsRetrieved = this.props.firebase.retrieveAllCommentsFromPost(this.userID, this.posterID);
        this.setState({ comments: commentsRetrieved })


    }

    showComments = () => {
        let comments = []


        // Outer loop to create parent
        for (let i = 0; i < this.state.comments.length; i++) {
            comments.push(<p> {this.state.comments[i]} </p>)
        }
        return comments
    }


    render() {
        return (
            <div className="row">
                <h6 className="left"> {this.state.userName} </h6>
                <img src={this.imgURL || "https://via.placeholder.com/400x300"} height="300" width="300" ></img>
                {this.showComments()}
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter,
)(PopUpPost);