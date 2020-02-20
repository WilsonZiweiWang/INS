import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button className='btn transparent' type="button" onClick={firebase.doSignOut}>
        <span className='black-text'>Sign Out</span>
    </button>
);

export default withFirebase(SignOutButton);