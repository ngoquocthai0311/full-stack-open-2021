import React from "react"

const PersonalForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input value={props.name} onChange={props.setStateName}/>
            </div>
            <div>
                phone: <input value={props.phone} onChange={props.setStatePhone}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonalForm