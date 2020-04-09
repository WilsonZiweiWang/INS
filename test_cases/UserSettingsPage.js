import React, { Component } from 'react';
import PasswordUpdateForm from '../component/PasswordUpdateForm';
import { withAuthorization } from '../Firebase';
import { AuthUserContext } from '../Firebase/index';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import '../index.css';

import ReactLoading from "react-loading";


class UserSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            done: undefined,
        }
    }

    componentDidMount() {

        const { authUser } = this.props;

        if (authUser) {
            const { uid } = authUser;
            this.props.firebase.user(uid).once('value', snapshot => {
                //get the values that under column user with uid 
                const user = snapshot.val();
                this.setState({ user, done: true })
            });
        } else {
            this.setState({ user: null })
        }
    }

    componentWillUnmount() {
        // this.listener();
    }
    render() {

        const { user } = this.state;

        return (
            <AuthUserContext.Consumer>
                {authUser => authUser && user && this.state.done ? //make sure all loaded before rendering html
                    //each component first loads without authUser, 
                    //need to wait for the authenticated user to be loaded (async process)
                    //otherwise the html part will be loaded before having the authUser which might leads to errors
                    <div>
                        <div className='container' >
                            <h4 className='center'>Settings</h4>
                            <div className='row'>
                                <div id='side-nav'>
                                    <div className='card'>
                                        <ul className="collection">
                                            <li className="collection-item"><a href="#profile">Profile</a></li>
                                            <li className="collection-item"><a href="#password">Password</a></li>
                                            {/* <li className="collection-item"><a href="#others">Others</a></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div id='main-content'>

                                    <h6 className='left row' style={{ display: 'block', width: '100%' }}><u>Profile</u></h6>

                                    <div id='profile' style={{ marginLeft: '-125px', padding: '0px 10px' }}>
                                        <ul className='container'>
                                            <li >
                                                <label>Username</label>
                                                <p>{user.username}</p>
                                            </li>
                                            <li >
                                                <label>Email</label>
                                                <p>{user.email}</p>
                                            </li>
                                            <li >
                                                <label>First Name</label>
                                                <p>{user.firstname}</p>
                                            </li>
                                            <li >
                                                <label>Last Name</label>
                                                <p>{user.lastname}</p>
                                            </li>
                                            {/* <li>
                                            <label>Description</label>
                                            <div className="input-field">
                                                <i className="material-icons prefix">mode_edit</i>
                                                <textarea id="text-area" className="materialize-textarea"></textarea>
                                            </div>
                                        </li> */}

                                        </ul>
                                    </div>

                                    <h6 className='left'><u>Update Password</u></h6>
                                    <div id='password'>
                                        <PasswordUpdateForm />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <footer className="page-footer transparent" >
                            <div className="footer-copyright">
                                <div className="container black-text">
                                    © 2020 Copyright NIS
                            <div className="black-text text-lighten-4 right">Powered by <a href='https://reactjs.org/' className="blue-text">React</a></div>
                                </div>
                            </div>
                        </footer>
                    </div>

                    :
                    <div className="center" style={{ 'marginLeft': '50%', 'marginTop': '20%' }} >
                        <ReactLoading type={"bars"} color={"black"} />
                    </div>}
            </AuthUserContext.Consumer>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
    }
};

// assign the value authUser to condition when authUser is not null
// the shorter version of
// condition = authUser => authUser != null;
const condition = authUser => !!authUser;

export default compose(
    connect(mapStateToProps),
    withAuthorization(condition),
)(UserSettingsPage);
