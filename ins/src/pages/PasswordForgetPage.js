import React, { Component } from 'react'
import PasswordForget from '../component/PasswordForget';

export class PasswordForgetView extends Component {
    render() {
        return (
            <div className='container center' id='pw-forgot-page'>
                <h4>Forgot password?</h4>
                <PasswordForget />
            </div>
        )
    }
}

export default PasswordForgetView;
