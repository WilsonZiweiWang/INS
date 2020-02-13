import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPost from '../component/addPost';

class AddPostView extends Component {

    state = {
        todos: [
          { id: 1, content: 'Add a new todo' },
          { id: 2, content: 'Meeting with teamates tomorrow' }
        ]
      }

    addTodo = (todo) => {
        todo.id = Math.random();
        let newTodos = [...this.state.todos, todo];
        this.setState({
            todos: newTodos
        })
    }

    render() {
        return (
            <div className="container center" >
                Add post
            <AddPost></AddPost>
            </div>
        )
    }


}


const mapStateToProps = (state, ownProps) => {


    //the id above is String!!!
    //so do not use === inside the return()

    let id = ownProps.match.params.post_id;

    // console.log(id);
    // console.log(state.posts);

    return {
        // post: state.posts.find((post) => {
        //     return post.id == id
        // })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //dispatch is the function from redux store 

        // (id) here means this props requires an argument called id
        //deletePost: (id) => { dispatch(DeletePost(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostView);