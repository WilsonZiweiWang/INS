import React, {Component} from 'react';
import './App.css';
import Homepage from './pages/homePage-view';
import AddPostView from './pages/addPost-view';
import SignInView from './pages/SignIn-view';
import NavBar from './component/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component{
  render() {
    return(
    <BrowserRouter>
      <div className="ins">
        <NavBar/>
        <Route exact path='/' component={Homepage} />
        <Route path='/addPost' component={AddPostView}/>
        <Route path='/signIn' component={SignInView}/>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
