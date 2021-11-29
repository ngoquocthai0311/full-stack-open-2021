import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const actionType = {
  good: 'GOOD',
  ok: 'OK',
  bad: 'BAD',
  reset: 'ZERO'
}

const App = () => {
  const handleSetState = (action) => {
    switch(action) {
      case actionType.good: 
        store.dispatch({ type: actionType.good }) 
        return 
      case actionType.ok:
        store.dispatch({ type: actionType.ok })
        return 
      case actionType.bad: 
        store.dispatch({ type: actionType.bad })
        return
      case actionType.reset:
        store.dispatch({ type: actionType.reset })
        return
      default: return
    }
  }

  return (
    <div>
      <button onClick={() => handleSetState(actionType.good)}>good</button> 
      <button onClick={() => handleSetState(actionType.ok)}>ok</button> 
      <button onClick={() => handleSetState(actionType.bad)}>bad</button>
      <button onClick={() => handleSetState(actionType.reset)}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
