import React , {Component} from 'react';
import Post from '../component/post';

class HomePage extends Component{

    render(){
        return(
            <div className="center" >
                <span>Home Page</span>
                <Post></Post>
            </div>
        )
    }
}

export default HomePage;