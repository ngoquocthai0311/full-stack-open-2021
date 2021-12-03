const actionType = {
    set: 'SET_MESSAGE',
    remove: 'REMOVE_MESSAGE'
}
// hold reference of setTimeOut callback 
let TIME_OUT_ID

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
        clearTimeout(TIME_OUT_ID)
        dispatch(setMessage(message))
        TIME_OUT_ID = setTimeout(() => {
            dispatch(removeMessage())
        }, time)
    }
}

export default messageReducer