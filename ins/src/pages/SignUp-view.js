import React from 'react';
import SignUp from '../auth/SignUp';
import { FirebaseContext } from '../Firebase';
import { Link } from 'react-router-dom';

export default function SignUpView() {
    return (
        <div className='container center'>
            <SignUp />
        </div>
    )
}
