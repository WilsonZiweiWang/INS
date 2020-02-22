import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        }
    }
    //The listener is called on(), which receives a type and a callback function. 
    //The on() method registers a continuous listener that triggers every time something has changed, 
    //the once() method registers a listener that would be called only once. 
    //In this scenario, we are interested to keep the latest list of users.
    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        //remove the listener to avoid memory leaks
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;
        console.log('users', users);
        return (
            <div className='container'>
                <h3 className='center'>AdminPage</h3>
                {/* the text below will show when loading is true, it will disappear when its false */}
                {loading && <div>Loading ...</div>}
                <UserList users={users} />
            </div >
        )
    }
}
//{users} here is destructured format of users = users, prop name 'users' and value 'users'
const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(AdminPage);
