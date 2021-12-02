const actionType = {
    set: 'SET_MESSAGE',
    remove: 'REMOVE_MESSAGE'
}

const messageReducer = (state = '', action) => {
    switch(action.type) {
        case actionType.set:
            return action.data.message
        case actionType.remove:
            return action.data.message
        default: return state
    }
}

const setMessage = (message) => {
    return {
        type: actionType.set,
        data: { message }
    }
}

const removeMessage = () => {
    return {
        type: actionType.remove,
        data: { message: '' }
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(removeMessage())
        }, time)
    }
}

export default messageReducer