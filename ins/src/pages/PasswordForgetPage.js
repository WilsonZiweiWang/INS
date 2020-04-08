import React, { Component } from 'react'
import PasswordForget from '../component/PasswordForget';

export class PasswordForgetView extends Component {
    render() {
        return (
            <div>
            <div className='container center' id='pw-forgot-page'>
                <h4>Forgot password?</h4>
                <PasswordForget />
            </div>
            <footer className="page-footer transparent" style={{ 'marginTop': '19%' }}>
                <div className="footer-copyright">
                    <div className="container black-text">
                        © 2020 Copyright NIS
                        <div className="black-text text-lighten-4 right">Powered by <a href='https://reactjs.org/' className="blue-text">React</a></div>
                    </div>
                </div>
            </footer>
        </div>
        )
    }
}

export default PasswordForgetView;
