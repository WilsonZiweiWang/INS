import React ,{Component} from 'react';



class AddPost extends Component{
    state = {
        text : '',

    }

    handleChange = (e) => {
        this.setState({
            text : e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            text : ''
        })
    }

    render(){
        return(
            <div className='center'>
                <form class='form-AddPost' onSubmit={this.handleSubmit}>
                <label>Say something...</label>
                <input type='text' onChange={this.handleChange} value={this.state.text}/>
                <button className="btn waves-effect waves-light black-text transparent" type="submit" name="action">
                    Post
                    <i className='material-icons right '>
                        check
                    </i>
                </button>  
                </form>
                
            </div>
        )
    }
}

export default AddPost;
