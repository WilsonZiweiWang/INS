import React, { Component } from 'react';
import PasswordUpdateForm from '../component/PasswordUpdateForm';
import { withAuthorization } from '../Firebase';
import { AuthUserContext } from '../Firebase/index';
import '../index.css';


class UserSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged((user) => {
            if (user) { //using onAuth...() above to get the current user id if the page is authticated at the moment
                let id = user.uid;
                console.log('ref id', id);
                this.props.firebase.user(id).on('value', snapshot => {
                    //get the values that were set during the sign up 
                    const currentUser = snapshot.val();
                    this.setState({ user: currentUser })
                });

            } else {
                this.setState({ user: null })
            }
        })
    }

    componentWillUnmount() {
        this.listener();

    }
    render() {

        const currentUser = this.state.user;

        return (
            <AuthUserContext.Consumer>
                {authUser => authUser && currentUser ? //make sure all loaded before rendering html
                    //each component first loads without authUser, 
                    //need to wait for the authenticated user to be loaded (async process)
                    //otherwise the html part will be loaded before having the authUser which might leads to errors
                    //here use simple ternary to load nothing if authUser is not retreived yet
                    <div className='container' >
                        <h4 className='center'>Settings</h4>
                        <div className='divider'></div>
                        <div className='row'>
                            <div id='side-nav'>
                                <div className='card'>
                                    <ul className="collection">
                                        <li className="collection-item"><a href="#profile">Profile</a></li>
                                        <li className="collection-item"><a href="#password">Password</a></li>
                                        <li className="collection-item"><a href="#others">Others</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div id='main-content'>

                                <h6 className='left row' style={{ display: 'block', width: '100%' }}>Profile</h6>

                                <div id='profile' style={{ marginLeft: '-125px', padding: '0px 10px' }}>
                                    <ul className='container'>
                                        <li >
                                            <label>Username</label>
                                            <p>{currentUser.username}</p>
                                        </li>
                                        <li >
                                            <label>Email</label>
                                            <p>{currentUser.email}</p>
                                        </li>
                                        <li >
                                            <label>First Name</label>
                                            <p>{currentUser.firstname}</p>
                                        </li>
                                        <li >
                                            <label>Last Name</label>
                                            <p>{currentUser.lastname}</p>
                                        </li>
                                        <li>
                                            <label>Description</label>
                                            <div class="input-field">
                                                <i class="material-icons prefix">mode_edit</i>
                                                <textarea id="text-area" class="materialize-textarea"></textarea>
                                            </div>
                                        </li>

                                    </ul>
                                </div>

                                <h6 className='left'>Update Password</h6>
                                <div id='password'>
                                    <PasswordUpdateForm />
                                </div>
                            </div>

                        </div>

                    </div>

                    : null}
            </AuthUserContext.Consumer>

        )
    }
}


// assign the value authUser to condition when authUser is not null
// the shorter version of
// condition = authUser => authUser != null;
const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserSettingsPage);
