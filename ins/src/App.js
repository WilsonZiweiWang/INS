import React, { Component } from 'react';

import Homepage from './pages/homePage-view';
import AddPostView from './pages/addPost-view';
import SignInView from './pages/SignIn-view';
import SignUpView from './pages/SignUp-view';
import UserSettingsPage from './pages/UserSettingsPage';
import UserPageView from './pages/UserPage-view';
import AdminPage from './pages/AdminPage';
import PasswordForgetView from './pages/PasswordForgetPage';

import NavBar from './component/NavBar';
import Footer from './component/Footer';

import { BrowserRouter, Route } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';


class App extends Component {

  constructor(props) {
    super(props);
    this.props.onSetAuthUser(
      JSON.parse(localStorage.getItem('authUser')),
    );
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      localStorage.setItem('authUser', JSON.stringify(authUser));
      //set authUser in the redux store 
      //so that other components can access it without authUserContext
      this.props.onSetAuthUser(authUser);
    },
      //when null is returned
      () => {
        localStorage.removeItem('authUser');
        this.props.onSetAuthUser(null);
      },
    );
  }


  render() {
    const { authUser } = this.props;
    return (

      <AuthUserContext.Provider value={authUser}>
          <BrowserRouter>
            <div className="ins">
              <NavBar />
              <Route exact path='/home' component={Homepage} />
              <Route path='/addPost' component={AddPostView} />
              <Route path='/signIn' component={SignInView} />
              <Route path='/signUp' component={SignUpView} />
              <Route path='/pw-forget' component={PasswordForgetView} />
              <Route path='/settings' component={UserSettingsPage} />
              <Route path={'/account/'} component={UserPageView} />
              <Route path='/admin' component={AdminPage} />
              <Footer />
            </div>
          </BrowserRouter>    
      </AuthUserContext.Provider>

    )
  }

  componentWillUnmount() {
    this.listener();
  }

}

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser =>
    dispatch({ type: 'AUTH_USER_SET', authUser }),

});

const mapStateToProps = (state) => {
  return {
    authUser: state.sessionState.authUser,
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(App);
