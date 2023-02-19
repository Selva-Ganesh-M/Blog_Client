import React from 'react'
import "./loader.css"

type Props = {}

const RegisterLoadingScreen = (props: Props) => {
    return (
        <>
            <div className="loaderContainer">
                <div className="loader"></div>
            </div>
        </>
    )
}

export default RegisterLoadingScreen