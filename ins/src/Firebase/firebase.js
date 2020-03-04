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

    // *** User Posts API ***
    post = pid => this.db.ref(`posts/${pid}`);
    posts = () => this.db.ref(`posts`);
}
export default Firebase;

