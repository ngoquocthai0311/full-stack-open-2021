
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.message)

    const renderNotification = () => {
        if (message !== '') {
        return (
            <div style={style}>
            {message}
            </div>
        )
        }
    }

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <>
            {renderNotification()}
        </>
    )
}

export default Notification