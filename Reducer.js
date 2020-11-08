export const initialState = {
    user: null
}

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case 'UPDATE_USER':
            return { 
                ...state,
                user: action.item
            }
        default:
            return state  
    }
}

export default reducer