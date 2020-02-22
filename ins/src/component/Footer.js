import React from 'react';
import { withRouter } from 'react-router-dom';
// import '../index.css';

const Footer = () => {
    return (
        <footer className="page-footer transparent">
            <div className='divider'></div>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="black-text">Footer Content</h5>
                        <p className="black-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="black-text">Links</h5>
                        <ul>
                            <li><a className="black-text text-lighten-3" href="#!">Link 1</a></li>
                            <li><a className="black-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a className="black-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a className="black-text text-lighten-3" href="#!">Link 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container black-text">
                    © 2020 Copyright LOGO
            <a className="black-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
        </footer>
    )
}

export default withRouter(Footer);