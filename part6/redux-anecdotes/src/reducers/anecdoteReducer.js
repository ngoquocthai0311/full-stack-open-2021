const actionType = {
    vote: 'VOTE_INCREMENT',
    add: 'NEW_ANECDOTE',
    initialize: 'INITIALIZE_ANECDOTES'
}

export const asObject = (anecdote) => {
    return {
        content: anecdote,
        votes: 0
    }
}

const anecdoteReducer = (state = [], action) => {
    switch(action.type){
        case actionType.initialize:
            return action.data
        case actionType.vote:
            return state.map(blog => blog.id === action.data.id ? { ...blog, votes: blog.votes + 1 } : blog)
        case actionType.add:
            return [ ...state, action.data ]
        default: return state
    }
}

export const increaseVote = (id) => {
    return {
        type: actionType.vote,
        data: { id }
    }
}

export const addNewAnecdote = (content) => {
    return {
        type: actionType.add,
        data: content
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: actionType.initialize,
        data: anecdotes
    }
}

export default anecdoteReducer