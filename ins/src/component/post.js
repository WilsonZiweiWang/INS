import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class PostCard extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        //get post info here
    }

    render() {
        const { imageUrl, description } = this.props;
        console.log(imageUrl);
        console.log(this.props)
        return (
            <div className="card col s4 m6">
                <div className="card-content">
                    <img src={imageUrl || "https://via.placeholder.com/400x300"} height="100" width="100" ></img>
                    <br/>
                    <div>
                        This is a post card
                        {description}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // post: state.postState.posts;
        authUser : state.sessionState.authUser,
        imageUrl : null,
        description: '',
        user_id : null,
    }
}

export default compose(
    connect(mapStateToProps),
)(PostCard);
