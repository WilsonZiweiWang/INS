import React from 'react';
import './App.css';
import Homepage from './component/homePage-view';
import NavBar from './component/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="ins">
        <NavBar/>
        <Route exact path='/' component={Homepage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
