import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as ROUTES from '../constants/Routes';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Firebase'

const withAuthorization = (condition) => Component => {

    class WithAuthorization extends React.Component {
        componentDidMount() {
            //The real authorization logic happens in the componentDidMount() lifecycle method. 
            //Like the withAuthentication() higher-order component, 
            //it uses the Firebase listener to trigger a callback function every time the authenticated user changes.
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) { //the new prop 'condition' here takes an argument, the condition will be defeined 
                        // within the component that requires proctected route
                        // when authUser is null, condition(authUser) will be null which therefore makes 'if' statement
                        // execute
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                //avoid showing the protected page before the redirect happens. 
                //show nothing if the authenticated user doesn't meet the condition's criteria.
                // Then it's fine if the listener is too late to redirect the user, 
                //because the higher-order component didn't show the protected component.

                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>


            )
        }

    }

    const mapStateToProps = state => ({
        authUser: state.sessionState.authUser,
    });

    //using compose method to wrap a component with multiple HOC 
    return compose(
        withRouter,
        withFirebase,
        connect(mapStateToProps),
    )(WithAuthorization);
};

export default withAuthorization;