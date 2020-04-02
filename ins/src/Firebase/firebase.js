import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from "firebase/app";
import "firebase/storage";
const config = {
    apiKey: "AIzaSyDWdmpw-eKM9UY1SV_-VxdBTf_CMOMKegw",
    authDomain: "soen341-c4379.firebaseapp.com",
    databaseURL: "https://soen341-c4379.firebaseio.com",
    projectId: "soen341-c4379",
    storageBucket: "soen341-c4379.appspot.com",
    messagingSenderId: "241282320048",
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }
    // *** Auth API ***

    //sign up
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    //sign in/login
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    //sign out
    doSignOut = () => this.auth.signOut();
    //reset pw
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    //update pw
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`); //a ref to one user
    users = () => this.db.ref('users'); //a ref to all users

    // ***  Posts API ***
    post = pid => this.db.ref(`posts/${pid}`);
    posts = () => this.db.ref('posts');

    // *** User's Posts API ***
    user_post = (uid,pid) => this.db.ref(`user-posts/${uid}/${pid}`);
    user_posts = uid => this.db.ref(`user-posts/${uid}`);

    //*** User's followers API ***
    
    //*** User's following API ***

    // SECTION : methods for accessing database items

    retrieveAllPostData = () => {
        /*
        retrieve images + postID + userID (that posted that post)
        */
        var IMGs = []
        var PIDs = []
        var UIDs = []

        this.db.ref(`user-posts/`).once('value', (snapshotHigh)=> {
            snapshotHigh.forEach((itemhigh)=>{
                var userID = itemhigh["key"]

                this.db.ref('user-posts/'+userID).once('value', (snapshot)=> {
                    snapshot.forEach((item) => {
                        var postID = item["key"]
                        PIDs.push(postID);
    
                        var userID_ = userID
                        UIDs.push(userID_);
    
                        var imgURL = item.val().imageUrl;
                        IMGs.push(imgURL);
                    })
                })
            })
        })

        return [IMGs, PIDs, UIDs]
    }

    retrieveAllCommentsFromPost = (uid, pid) => {
        /*
        retrieve all the comments from a post using postID and UID
        */
        var comments = []
        
        this.db.ref('user-posts/'+uid+'/'+pid+'/text').once('value', (snapshot)=> {
            snapshot.forEach((item) => {
                var comment = item.val();
                comments.push(comment)
            })
        })

        return comments
    }

    postComment = (uid, pid, text) => {
        this.db.ref(`user-posts/`+uid+'/'+pid+'/text').push(text)
    }

    followUserSave = (signedInUser, uid) => {
        this.db.ref(`users/`+ signedInUser +'/following').push(uid)
    }
    
}

export default Firebase;

