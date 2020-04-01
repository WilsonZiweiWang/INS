import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

class PopUpPost extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            comments: [],
            userName: "default"
        };

        this.posterID = this.props.pid;
        this.userID = this.props.uid;
        this.imgURL = this.props.imgUrl;    
    }

    componentDidMount() {
        this.retrieveAllComments();
        this.retrieveUserName();
    }

    retrieveUserName() {
        this.props.firebase.db.ref('users/'+this.userID).on('value', function (snapshot) {
            var username = snapshot.val().username;
            console.log(username)
            // this.setState({ userName: username }); FIXME : getting an error "TypeError: Cannot read property 'setState' of null"
        });
    }

    retrieveAllComments() {

        this.setState({ comments: [] })


        this.props.firebase.db.ref('user-posts/'+this.userID+'/'+this.posterID+'/text').once('value', (snapshot)=> {
            snapshot.forEach((item) => {
                var comment = item.val();
                var joinedComments= this.state.comments;
                joinedComments.push(comment)

                this.setState({ comments: joinedComments })
            })
        })
    }

    showComments = () => {
        let comments = []

        // console.log(this.state.comments)
    
        // Outer loop to create parent
        for (let i = 0; i < this.state.comments.length; i++) {
        //   images.push(<img src={this.state.imgUrls[i]} height="500" width="500"></img>)
        comments.push(<p> {this.state.comments[i]} </p>)
        }
        return comments
    }
    

    render() {
        return(
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