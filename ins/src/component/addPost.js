import React ,{Component} from 'react';



export class AddPost extends Component{
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
        // this.props.addTodo(this.state);
        // this.setState({
        //     text : ''
        // })
    }

    render(){
        return(
            <div className='container center'>
                <form class='form-AddPost' onSubmit={this.handleSubmit}>
                <div className='input-field'>
                <label>Description</label>
                <textarea id="textarea1" className="materialize-textarea" type='text' onChange={this.handleChange} value={this.state.text} placeholder='Say something...'></textarea>
                </div>
                <button className="btn waves-effect waves-light black-text transparent " type="submit" name="action">
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
