import React, { Component } from 'react';
import { withAuthorization } from '../Firebase';
import { AuthUserContext } from '../Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ImagePreview from '../component/ImagePreview';



class HomePage extends Component {

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser ?
                    <div className="center" >
                        {/* <h3>Home Page</h3> */}
                        <ImagePreview />
                    </div>
                    : null}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
    }
};

export default compose(
    connect(mapStateToProps),
    withAuthorization(condition),
)(HomePage);
