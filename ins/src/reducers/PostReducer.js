const INITIAL_STATE = {
    image : null,
    text : '',
}


const postReducer = (state = INITIAL_STATE, action) => {
    console.log('post action', action);
    switch(action.type){
        case 'IMAGE_PREVIEW':
            console.log('setting image', action.image);
            return {
                ...state,
                image : action.image,
            }
        case 'TEXT_CHANGE':
            return{
                ...state,
                text : action.text,
            }
        case 'POST_REQUEST':
            return null;
        case 'POST_SUCCESS':
            return null;
        case 'POST_FAILIUER':
            return null;
        default:
            return state;
    }
}

export default postReducer;