import React from 'react';
import SignIn from '../auth/SignIn';

export default function SignInView() {
    return (
        <div>
            <div className='container center'>
                <SignIn></SignIn>
            </div>

            <footer className="page-footer transparent" style={{'marginTop':'11%'}}>
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
