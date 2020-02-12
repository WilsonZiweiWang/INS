const initState = {
    posts: [
        {
            "userId": 1,
            "id": 1,
            "title": "Redux: sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "userId": 1,
            "id": 2,
            "title": "Redux: qui est esse",
            "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            "userId": 1,
            "id": 3,
            "title": "Redux: ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
        }
    ]
}

const PostReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SHOW_INITIAL_STATE':
            return initState;
        default:
            return initState;
    };
}

export default PostReducer;