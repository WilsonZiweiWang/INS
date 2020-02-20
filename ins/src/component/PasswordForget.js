import React, { Component } from 'react';
import { withFirebase } from '../Firebase';



const initstate = {
    email: '',
    // emailSent: false,
    error: null,
}

export class PasswordForget extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initstate };
    }

    handleSubmit = (e) => {
        const { email } = this.state;
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ 
                    ...initstate,
                    //emailSent : true,
                 });
            })
            .catch(error => {
                this.setState({ error });
            });


        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';

        return (

            <div className='container center'>
                <div className='card'>
                    <div className='card-content'>
                        <title>Forgot Password</title>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email' value={this.state.email} onChange={this.handleChange} />
                            <button className='btn button-transparent' disabled={isInvalid}>
                                <p>Send recover email</p>
                            </button>
                            {error && <p className='red-text'>{error.message}</p>}
                            {/* {this.emailSent ? <p>Email sent</p> : ''} */}
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default withFirebase(PasswordForget);
