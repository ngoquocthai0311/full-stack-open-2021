import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
    const [visibility, setVisibility] = useState(false)

    const showWhenVisible = { display: visibility ? '' : 'none' }
    const hideWhenVisible = { display: visibility ? 'none' : '' }

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancle</button>
            </div>
        </div>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
