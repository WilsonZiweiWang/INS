import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase/context";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';

// TODO :

class ImagePreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: "",
            imageUrls: []
        };

        this.retrieveAllImages();
        console.log(this.props.firebase.auth)
    }

    // SECTION : function that retrieves all the images URLs
    retrieveAllImages = () => {
        // clear image
        this.setState({ imageUrls: [] })

        var storageRef = this.props.firebase.storage.ref('images/'); // you need to call it this way to get the storage correctly
    
        // Now we get the references of these images
        storageRef.listAll().then(function (result) {
            result.items.forEach(function (imageRef) {

                // adding the url of the images to the imageUrls
                getImgUrl(imageRef).then(function (url){
                    var joined = this.state.imageUrls.concat(url);
                    this.setState({ imageUrls: joined })
                }.bind(this))

            }.bind(this));
        }.bind(this)).catch(function (error) {
            // Handle any errors
            console.log("error getting images")
        });

        // get the url of the image 
        function getImgUrl(imageRef) {
            return imageRef.getDownloadURL().then(function (url) {
                return url;
            }).catch(function (error) {
                // Handle any errors
            });
        }        
    }

    render() {
        return (
            <div className="center">
            {
                // for loop to make the images to display
                this.state.imageUrls.map((url, index) => 
                    < PostPreview imgUrl={url}/>

                    // React.createElement('img', {src: url, key: index, height: "500" ,width: "500"})
                    // <Popup trigger={React.createElement('img', {src: url, key: index, height: "500" ,width: "500"})} position="right center"     
                    // modal
                    // closeOnDocumentClick>
                    //     <textarea> </textarea>
                    //     <button> Comment </button>
                    // </Popup>
                )
            }
            {/* <Popup trigger={<button> Trigger</button>} position="right center">
                <textarea> </textarea>
            </Popup> */}
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter,
)(ImagePreview);