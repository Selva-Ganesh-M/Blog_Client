import React from 'react'
import "./login.css"
import image from "../../../assets/images/input.png"
import loginBanner from "../../../assets/images/my-account.jpg"

type Props = {}

const Login = (props: Props) => {
    return (
        <section className="accountInfo">
            <div className="banner">
                <img src={loginBanner} alt="login-banner" />
                <div className="banner-overlay">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="inner">
                <div className="container boxItems">
                    <h1>Account Information</h1>
                    <div className="content">
                        <div className="left">
                            <div className="img flexCenter">
                                <input type="file" src={image} alt="imgs" />
                                <img src={image} alt="images" />
                            </div>
                        </div>
                        <div className="right">
                            <input type="email" placeholder='email' />
                            <input type="password" placeholder='password' />
                            <button className="button">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login