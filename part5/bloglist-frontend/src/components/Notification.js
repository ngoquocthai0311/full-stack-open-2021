import React from 'react'

const Notification = ({notification}) => {
    const successStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        color: 'green',
        border: '3px solid green',
        borderRadius: '0.2em',
        padding: '5px'
    }
    const errorStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        color: 'red',
        border: '3px solid red',
        borderRadius: '0.2em',
        padding: '5px'
    }

    const renderNotification = () => {
        if (notification === null) {
            return null
        }
        if (notification !== null && notification.type === 'success') {
            return (
                <>
                    <p style={successStyle}>{notification.message}</p>
                </>
            )
        } else {
            return (
                <>
                    <p style={errorStyle}>{notification.message}</p>
                </>
            )
        }
    }
    return (
        <>
            {renderNotification()}
        </>
    )
}

export default Notification