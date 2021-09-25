import React from "react";

const Notification = ({notificationMessage, isError}) => {
    const notificationErrorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const notificationSuccessStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (notificationMessage === '') {
        return null
    } else if (isError === false) {
        return (
            <div style={notificationSuccessStyle}>
                {notificationMessage}
            </div>
        )
    } 
    return (
        <div style={notificationErrorStyle}>
            {notificationMessage}
        </div>
    )
}

export default Notification