import React, { Component } from 'react';
import '../styles/SignIn.css';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/Routes';


const initstate = {
    email: '',
    password: '',
    error: null,
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { ...initstate };
    }
    handleSubmit = (e) => {
        //e.preventDefault();
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...initstate });
                this.props.history.push('/home');
            })
            .catch(error => {
                this.setState({ error });
            });

        e.preventDefault();
        //console.log('submit', e)
    }

    handleChange = (e) => {
        //console.log(e)
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    render() {
        const { email, password, error } = this.state;
        //inputs validation
        const isInvalid = password === '' || email === '';
        return (

            <div className="container s12 m6" id='card-signIn'>

                <div className='card'>

                    <div className='card-content'>
                        <form onSubmit={this.handleSubmit} className='white' id='form-signIn'>
                            <h5>Sign In</h5>
                            <div className='input-field' >
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' onChange={this.handleChange} />
                            </div>
                            <div className='input-field'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' onChange={this.handleChange} />
                            </div>
                            <div className='center'>
                                <button className='btn transparent wave-effect' disabled={isInvalid}>
                                    <span className={isInvalid ? '' : 'black-text'}>Sign In</span>
                                </button>
                            </div>
                            <div className='center' id='links'>
                                <Link id='pw-forgot' to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
                                <p> or </p>
                                <Link id='link-signup' to={ROUTES.SIGN_UP}>Sign up</Link>.
                            </div>
                            {error && <p className='red-text'>{error.message}</p>}
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(withFirebase(SignIn));
