import React, { Component } from 'react';
import '../styles/SignIn.css';
import { connect } from 'react-redux';


class SignIn extends Component {
    state = {
        email: null,
        password: null,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit', e)
    }

    handleChange = (e) => {
        console.log(e)
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    render() {
        return (

            <div className="container s12 m6" id='card-signIn'>

                <div className='card'>
                    <div className='row'>

                        <ul className='tabs tabs-transparent' id="tabs-swipe-demo">
                            <li className='tab col s6'><a href='#signIn'><span className='black-text'>Sign In</span></a></li>
                            <li className='tab col s6'><a href='#signUp'><span className='black-text'>Sign Up</span></a></li>
                        </ul>

                        <div id='signIn' className='col s12'>
                            <div className='card-content'>
                                <form onSubmit={this.handleSubmit} className='white' id='form-signIn'>
                                    <h5>Sign In</h5>
                                    <div className='input-field' >
                                        <label htmlFor='email'>Email</label>
                                        <input type='email' id='email' onChange={this.handleChange} />
                                    </div>
                                    <div className='input-field'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password' id='password' onChange={this.handleChange} />
                                    </div>
                                    <button className='btn transparent wave-effect'>
                                        <span className='black-text'>Submit</span>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div id='signUp' className='col s12'>
                            <div className='card-content'>
                                <form onSubmit={this.handleSubmit} className='white' id='form-signUp'>
                                    <h5>Sign Up</h5>
                                    <div className='input-field' >
                                        <label htmlFor='email'>Email</label>
                                        <input type='email' id='signUp-email' onChange={this.handleChange} />
                                    </div>
                                    <div className='input-field'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password' id='signUp-password' onChange={this.handleChange} />
                                    </div>
                                    <button className='btn btn-floating transparent'>
                                        <i className='material-icons black-text'>
                                            check
                                         </i>
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {


    //the id above is String!!!
    //so do not use === inside the return()

    //let id = ownProps.match.params.post_id;

    // console.log(id);
    console.log('state',state);
    console.log('ownprops', ownProps);
    return {
        // post: state.posts.find((post) => {
        //     return post.id == id
        // })
    }
}

export default connect(mapStateToProps)(SignIn);
