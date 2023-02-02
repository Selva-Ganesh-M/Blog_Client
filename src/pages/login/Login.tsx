import React from 'react'
import "./login.css"
import image from "../../assets/images/input.png"

type Props = {}

const Login = (props: Props) => {
    return (
        <section className="accountInfor">
            <h1>Account Information</h1>
            <div className="content">
                <div className="left">
                    <div className="img flexCenter">
                        <input type="file" src={image} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login