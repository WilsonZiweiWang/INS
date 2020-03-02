import React from 'react';
import { withAuthorization } from '../Firebase';
import { AuthUserContext } from '../Firebase';
import {NavLink} from 'react-router-dom';
import * as ROUTES from '../constants/Routes';

const UserPageView = () => {
    return (

        <AuthUserContext.Consumer>
            {authUser => authUser ?
                <div className='container'>
                    <div name="header" className="row">
                        <img className='col l4' />
                        <div className='col l8'>
                            <p>Username </p>
                            <p>Self Description</p>
                            <NavLink to={ROUTES.SETTINGS} className='btn transparent tooltipped' data-position="bottom" data-tooltip="settings">
                                <i className='material-icons black-text'>
                                    settings
                                </i>
                            </NavLink>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='container row center'>
                        <h2>User's posts</h2>
                    </div>
                </div>

                : null}
        </AuthUserContext.Consumer>
    )

};
const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserPageView);
