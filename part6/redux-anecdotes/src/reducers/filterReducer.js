const actionType = {
    set: 'SET_FILTER'
}

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case actionType.set:
            return action.data.filter
        default: return state
    }
}

export const setFilter = (filter) => {
    return {
        type: actionType.set,
        data: { filter }
    }
}

export default filterReducer