import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';


// // TODO :
// var commentCount = 0;

// class PostPreview extends React.Component{
//     constructor(props){
//         super(props)
//         this.posterID = this.props.uid;
//         this.posterImg = this.props.imgUrl
        
//         this.localCommentCount = commentCount
//         commentCount = commentCount + 1
//     }

//     submitComment() {
//         var text = document.getElementById("comment-text-" + this.localCommentCount).value
//         alert(text);
//         // this.props.firebase.db.ref(`posts/${this.posterID}`).set({
//         //     text: text
//         // });
//         var postsRef = this.props.firebase.db.ref('posts/');
//     }

//     render() {
//         return(
//             <div>
//                 <textarea id={"comment-text-" + this.localCommentCount} rows="4" cols="50"> </textarea>
//                 <button type="button" onClick={this.submitComment.bind(this)} >Comment</button> 
//                 {/* to be able to access "this", we need to bind it to the method */}
//             </div>
//         );
//     }
// }

class ImagePreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: "",
            postersUIDs: [],
            userIDs: [],
            imgUrls: []
        };

        // this.retrieveAllImages();
        // console.log(this.props.firebase.auth)
    }

    componentDidMount() {
        this.retrieveAllImages();
    }

    // SECTION : function that retrieves all the images URLs
    retrieveAllImages = () => {
        // clear image
        this.setState({ postersUIDs: [] , imgUrls: [], userIDs: []})

        // var storageRef = this.props.firebase.storage.ref('images/'); // you need to call it this way to get the storage correctly
        // var post = this.props.firebase.db.ref('posts/pid');

        // this.props.firebase.db.ref(`posts/`).orderByChild("uid").once('value', (snapshot)=> {
        //     snapshot.forEach( (item)=>{
        //         // console.log(item["key"]) 
        //         var uidData = item["key"]
        //         var joinedUID = this.state.postersUIDs.concat(uidData);

        //         var imgData = item.val().comment_count;
        //         var joinedIMG = this.state.imgUrls.concat(imgData);

        //         this.setState({ postersUIDs: joinedUID , imgUrls: joinedIMG})
        //     } )
        // });

        this.props.firebase.db.ref(`user-posts/`).once('value', (snapshotHigh)=> {
            snapshotHigh.forEach((itemhigh)=>{
                var userID = itemhigh["key"]
                // console.log(userID)

                // this.props.firebase.db.ref('user-posts/${userID}')
                this.props.firebase.db.ref('user-posts/'+userID).once('value', (snapshot)=> {
                snapshot.forEach((item) => {
                    // console.log(data)
                    var postID = item["key"]
                    var joinedPID = this.state.postersUIDs.concat(postID);

                    var userID_ = userID
                    var joinedUID = this.state.userIDs.concat(userID_);

                    var imgURL = item.val().imageUrl;
                    var joinedIMG = this.state.imgUrls.concat(imgURL);

                    this.setState({ postersUIDs: joinedPID , userIDs: joinedUID, imgUrls: joinedIMG})
                })
                })
    })

    
        // // Now we get the references of these images
        // storageRef.listAll().then(function (result) {
        //     result.items.forEach(function (imageRef) {

        //         // adding the url of the images to the postersUIDs
        //         getImgUrl(imageRef).then(function (url){
        //             var joined = this.state.postersUIDs.concat(url);
        //             this.setState({ postersUIDs: joined })
        //         }.bind(this))

        //     }.bind(this));
        // }.bind(this)).catch(function (error) {
        //     // Handle any errors
        //     console.log("error getting images")
        // });
   
    })
}

    showComment() {
        alert("Hello! I am an alert box!!");
    }

    showImages = () => {
        let images = []
    
        // Outer loop to create parent
        for (let i = 0; i < this.state.postersUIDs.length; i++) {
        //   images.push(<img src={this.state.imgUrls[i]} height="500" width="500"></img>)
          images.push(<PostPreview pid={this.state.postersUIDs[i]} uid={this.state.userIDs[i]} imgUrl={this.state.imgUrls[i]}/>)
        }
        return images
      }

    render() {
        return (
            <div className="center">
            {
                this.showImages()
            }
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter,
)(ImagePreview);
