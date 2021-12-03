import anecdotesService from '../services/anecdotes'

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
            return state.map(blog => blog.id === action.data.id ? action.data : blog)
        case actionType.add:
            return [ ...state, action.data ]
        default: return state
    }
}

export const increaseVote = (anecdote) => {
    return async dispatch => { 
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        const response = await anecdotesService.increaseVote(updatedAnecdote)
        dispatch({
            type: actionType.vote,
            data: response
        })
    }
}

export const addNewAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNewAnecdote(asObject(content))
        dispatch({
            type: actionType.add,
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAllAnecdotes()
        dispatch({
            type: actionType.initialize,
            data: anecdotes
        })
    }
}

export default anecdoteReducer