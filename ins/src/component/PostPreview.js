import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";


// TODO :
var commentCount = 0;

class PostPreview extends React.Component{
    constructor(props){
        super(props)
        this.posterID = this.props.pid;
        this.userID = this.props.uid;
        this.posterImg = this.props.imgUrl;
        
        this.localCommentCount = commentCount
        commentCount = commentCount + 1
    }

    submitComment() {
        var text = document.getElementById("comment-text-" + this.localCommentCount).value
        this.props.firebase.db.ref(`user-posts/`+this.userID+'/'+this.posterID+'/text').set(text)
    }

    followUser() {
        var user = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.db.ref(`users/`+user+'/following').push(this.userID)
        // this.props.firebase.db.ref(`user/`+this.userID+'/following').set(joinedFollowingData)
    }

    render() {
        return(
            <div>
                {/* <textarea id={"comment-text-" + this.localCommentCount} rows="4" cols="50"> </textarea>
                <button type="button" onClick={this.submitComment.bind(this)} >Comment</button> 
                to be able to access "this", we need to bind it to the method */}
                <Popup trigger={React.createElement('img', {src: this.posterImg, height: "500" ,width: "500"})} position="right center"     
                modal
                closeOnDocumentClick>
                    <textarea id={"comment-text-" + this.localCommentCount}> </textarea>
                    <button onClick={this.submitComment.bind(this)}> Comment </button>
                    <button onClick={this.followUser.bind(this)}> Follow </button>
                </Popup>
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter,
)(PostPreview);