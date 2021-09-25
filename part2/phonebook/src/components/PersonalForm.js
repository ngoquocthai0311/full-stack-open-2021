import React from "react"

const PersonalForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input value={props.name} onChange={(event) => props.setStateName(event.target.value)}/>
            </div>
            <div>
                phone: <input value={props.phone} onChange={(event) => props.setStatePhone(event.target.value)}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonalForm