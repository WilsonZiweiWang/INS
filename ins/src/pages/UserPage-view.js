import React from 'react';
import { withAuthorization,AuthUserContext  } from '../Firebase';
import {NavLink} from 'react-router-dom';
import * as ROUTES from '../constants/Routes';
import { connect } from 'react-redux';
import { compose } from 'recompose';


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

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
    }
};

const condition = authUser => !!authUser;

export default compose(
    connect(mapStateToProps),
    withAuthorization(condition),
)(UserPageView);
