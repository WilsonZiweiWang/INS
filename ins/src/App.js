import React from 'react';
import './App.css';
import Homepage from './component/homePage-view';
import NavBar from './component/NavBar';
import ImageUploader from './component/ImageUploader';
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="ins">
        <NavBar/>
        <ImageUploader/>
        <Route exact path='/' component={Homepage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
