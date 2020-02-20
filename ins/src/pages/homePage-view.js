import React , {Component} from 'react';
import Post from '../component/post';


class HomePage extends Component{

    render(){
        return(
            <div className="center" >
                <h3>Home Page</h3>
                <Post></Post>
            </div>
        )
    }
}

export default HomePage;