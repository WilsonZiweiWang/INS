import { combineReducers } from 'redux';
import sessionReducer from './SessionReducer';
import userReducer from './UserReducer';
import messageReducer from './MessageReducer';
const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    messageState: messageReducer,
});
export default rootReducer;