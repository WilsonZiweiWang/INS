import { combineReducers } from 'redux';
import sessionReducer from './SessionReducer';
import userReducer from './UserReducer';
import messageReducer from './MessageReducer';
import postReducer from './PostReducer';
const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    messageState: messageReducer,
    postState : postReducer,
});
export default rootReducer;