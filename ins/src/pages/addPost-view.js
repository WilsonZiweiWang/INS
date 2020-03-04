import React from 'react';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import '../styles/AddpostView.css';

import '../styles/AddpostView.css';
import ImageUpload from '../component/ImageUpload';

import { AuthUserContext, withAuthorization } from '../Firebase';


const AddPostView = () => {

    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ?
                <div className="container" id='addpost-view' >
                    <div className='card  s12 m6'>
                        <div className='card-content'>
                            <ImageUpload />
                        </div>
                    </div>
                </div>

            : null}

        </AuthUserContext.Consumer>
    )



}

const condition = authUser => !!authUser;


export default compose(withAuthorization(condition))(AddPostView);
