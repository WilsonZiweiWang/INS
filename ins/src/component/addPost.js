import React ,{Component} from 'react';



class AddPost extends Component{
    state = {
        text = "",

    }

    handleChange = (e) => {
        this.setState({
            text : e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
    }

    render(){
        return(
            <div className='center'>
                <form class='form-AddPost' onSubmit={this.handleSubmit}>
                <label>Say something...</label>
                <input type='text' onChange={this.handleChange} value={this.state.text}/>  
                </form>
            </div>
        )
    }
}

export default AddPost;
