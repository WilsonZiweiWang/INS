import React from 'react';
import SignUp from '../auth/SignUp';

export default function SignUpView() {
    return (
        <div>
            <div className='container center'>
                <SignUp />
            </div>
            <footer className="page-footer transparent" style={{ 'marginTop': '5%' }}>
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
