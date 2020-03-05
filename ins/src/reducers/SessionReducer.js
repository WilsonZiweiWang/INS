const INITIAL_STATE = {
    authUser: null,
    //username: null,
};
const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser,
    //username : action.username,
});
function sessionReducer(state = INITIAL_STATE, action) {
    //console.log('action', action);
    switch (action.type) {
        case 'AUTH_USER_SET': {
            return applySetAuthUser(state, action);
        }
        default:
            return state;
    }
}
export default sessionReducer;
