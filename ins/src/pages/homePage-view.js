import React, { Component } from 'react';
import { withAuthorization } from '../Firebase';
import { AuthUserContext } from '../Firebase';



class HomePage extends Component {

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser ?
                    <div className="center" >
                        <h3>Home Page</h3>
                    </div>
                    : null}
            </AuthUserContext.Consumer>
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);