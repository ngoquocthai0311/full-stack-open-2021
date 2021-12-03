
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

    const renderNotification = () => {
        if (props.message !== '') {
        return (
            <div style={style}>
            {props.message}
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

const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification