import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import PopUpPost from './PopUpPost';

// TODO :
var commentCount = 0;

class PostPreview extends React.Component {
    constructor(props) {
        super(props)
        this.posterID = this.props.pid;
        this.userID = this.props.uid;
        this.posterImg = this.props.imgUrl;

        this.localCommentCount = commentCount
        commentCount = commentCount + 1
    }

    submitComment() {
        var text = document.getElementById("comment-text-" + this.localCommentCount).value
        this.props.firebase.postComment(this.userID, this.posterID, text)
    }

    followUser() {
        var user = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.followUserSave(user, this.userID)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card s12 m7 l4">
                        <div className="card-content">
                            {/* <h6 className="left">{author}</h6> */}
                            <img src={this.posterImg || "https://via.placeholder.com/400x300"} height="300" width="300" ></img>
                            <br />
                            <br />
                            <div className='divider'></div>
                            <div className="row center">
                                <div className="col l6">
                                    <button className="btn-flat tooltipped" data-position="top" data-tooltip="Like" >
                                        <i className="material-icons black-text">
                                            favorite_border
                                </i>
                                    </button>
                                </div>
                                <div className="col l6">

                                    <Popup trigger={
                                        <button className="btn-flat tooltipped" data-position="top" data-tooltip="Comment" >
                                            <i className="material-icons black-text">
                                                chat_bubble_outline
                                        </i>
                                        </button>}
                                        position="right center"
                                        modal
                                        closeOnDocumentClick>
                                        <PopUpPost pid={this.posterID} uid={this.userID} imgUrl={this.posterImg} />
                                        <textarea id={"comment-text-" + this.localCommentCount}> </textarea>
                                        <button onClick={this.submitComment.bind(this)}> Comment </button>
                                        <button onClick={this.followUser.bind(this)}> Follow </button>
                                    </Popup>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter,
)(PostPreview);