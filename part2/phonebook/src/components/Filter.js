import React from 'react'

const Filter = ({state, setState}) => {
    return (
        <div>
            filter shown with <input value={state} onChange={setState}/>
        </div>
    )
}

export default Filter