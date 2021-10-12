export const initialState = {
    user: null,
    rooms: [],
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ROOMS: 'SET_ROOM',
};

const reducer = (state,action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_ROOM:
            return {
                ...state,
                rooms: [ ...state.rooms, action.room ],
            };
    
        default:
            return state;
    }
};

export default reducer;