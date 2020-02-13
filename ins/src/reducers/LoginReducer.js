const initState = {
    account = [],
}


const LoginReducer = (state = initState, action) => {
    switch(action.type){
        case 'login':
            return state;
        default:
            return state;
    }
}

export default LoginReducer;