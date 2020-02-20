import React, { Component } from 'react';
import Homepage from './pages/homePage-view';
import AddPostView from './pages/addPost-view';
import SignInView from './pages/SignIn-view';
import SignUpView from './pages/SignUp-view';
import NavBar from './component/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import { withFirebase } from './Firebase';
import {AuthUserContext} from './Firebase'
import PasswordForgetView from './pages/PasswordForgetPage';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }


  render() {

    return (
      <AuthUserContext.Provider value={this.state.authUser}>

      <BrowserRouter>
        <div className="ins">
          <NavBar/>
          <Route exact path='/home' component={Homepage} />
          <Route path='/addPost' component={AddPostView} />
          <Route path='/signIn' component={SignInView} />
          <Route path='/signUp' component={SignUpView} />
          <Route path='/pw-forgot' component={PasswordForgetView}/>
        </div>
      </BrowserRouter>
      </AuthUserContext.Provider>


    )
  }
  componentWillUnmount() {
    this.listener();
  }
}

export default withFirebase(App);
