import React from 'react'

const Notification = ({ notification }) => {

    const renderNotification = () => {
        if (notification === null) {
            return null
        }
        if (notification !== null && notification.type === 'success') {
            return (
                <div className='success'>
                    {notification.message}
                </div>
            )
        } else {
            return (
                <div className='error'>
                    {notification.message}
                </div>
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