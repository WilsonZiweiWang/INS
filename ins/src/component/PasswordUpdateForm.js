import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

export class PasswordUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { passwordOne } = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';
        return (
            <form onSubmit={this.onSubmit} id="pw-update">
                <div className='input-field'>
                    <label htmlFor="password">New Password</label>
                    <input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                    />
                </div>

                <div className='input-field'>
                    <label htmlFor="passoword">Confirm your passoword</label>
                    <input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn transparent left">
                    <span className={isInvalid ? '' : 'black-text'}>Reset My Password</span>
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withFirebase(PasswordUpdateForm);
