import React, { Component } from 'react';
import '../styles/SignIn.css';
//import { connect } from 'react-redux';
//import { initializeApp } from 'firebase';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';



const init_state = {
    email: '',
    username: '',
    passwordOne: '',
    passwordTwo: '',
    firstname: '',
    lastname: '',
    error: null,
}

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = { ...init_state };
    }

    handleSubmit = (e) => {
        const { username, email, passwordOne } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)//async process
            .then(authUser => {
                this.setState({ ...init_state });//reset input fields
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            });
        //prevent refreshing
        e.preventDefault();
        // console.log('submit', e)
        // console.log('firebase', this.props)
    }

    handleChange = (e) => {
        //console.log(e)
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        //inputs validation
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (

            <div className="container s12 m6" id='card-signIn'>
                <div className='card'>
                    <div className='card-content'>
                        <form onSubmit={this.handleSubmit} className='white' id='form-signUp'>

                            <h5>Sign Up</h5>
                            <div className='row s12'>
                                <div className='input-field col s6' >
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' id='signUp-email' name='email' onChange={this.handleChange} />
                                </div>
                                <div className='input-field col s6' >
                                    <label>Username</label>
                                    <input type='text' id='signUp-username' name='username' onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className='row s12'>
                                <div className='input-field col s6'>
                                    <label htmlFor='password'>Password (6 characters Min.)</label>
                                    <input type='password' id='signUp-password' name='passwordOne' onChange={this.handleChange} />
                                </div>
                                <div className='input-field col s6'>
                                    <label htmlFor='password'>Confirm Password</label>
                                    <input type='password' id='signUp-conf-password' name='passwordTwo' onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className='row s12'>
                                <div className='input-field col s6'>
                                    <label>First Name</label>
                                    <input type='text' id='firstname' name='firstname' onChange={this.handleChange} />
                                </div>
                                <div className='input-field col s6'>
                                    <label>Last Name</label>
                                    <input type='text' id='lastname' name='lastname' onChange={this.handleChange} />
                                </div>
                            </div>
                            <button className='btn transparent' disabled={isInvalid}>
                                <span className='black-text'>Submit</span>
                            </button>
                            {error && <p className='red-text'>{error.message}</p>}
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state, ownProps) => {


//     //the id above is String!!!
//     //so do not use === inside the return()

//     //let id = ownProps.match.params.post_id;

//     // console.log(id);
//     console.log('state', state);
//     console.log('ownprops', ownProps);
//     return {
//         // post: state.posts.find((post) => {
//         //     return post.id == id
//         // })
//     }
// }

export default withRouter(withFirebase(SignUp));
