import React, { useState, useEffect } from 'react'
import "./register.css"
import image from "../../../assets/images/input.png"
import loginBanner from "../../../assets/images/my-account.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { getUser, registerUser, TRegisterData } from '../../../redux/slices/userSlice'
import { TStoreDispatch } from '../../../redux/store'

type Props = {}

const Register = (props: Props) => {
    //#region : declarations
    const dispatch: TStoreDispatch = useDispatch()
    const user = useSelector(getUser)
    const navigate = useNavigate()
    //#endregion

    //#region : custom-declarations
    const [input, setInput] = useState<TRegisterData>({ username: "", email: "", password: "" })
    const [isRegistering, setIsRegistering] = useState<Boolean>(false)

    //#endregion

    //#region : side-effects
    useEffect(() => {
        user.status ? navigate("/blogs") : null
        return () => { }
    }, [user])


    //#endregion

    //#region : functions
    const handleRegister = async () => {
        setIsRegistering(true)
        await dispatch(registerUser(input))
        setIsRegistering(false)
        setInput({ username: "", email: "", password: "" })
    }

    //#endregion

    //jsx rendering
    return (
        <section className="accountInfo">
            <div className="banner">
                <img src={loginBanner} alt="login-banner" />
                <div className="banner-overlay">
                    <h1>Register</h1>
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
                            {/* username */}
                            <input type="full name" placeholder='user name' value={input.username} onChange={(e) => setInput(prev => {
                                return { ...prev, username: e.target.value }
                            })} />
                            {/* email */}
                            <input
                                type="email"
                                placeholder='email'
                                value={input.email}
                                onChange={(e) => setInput(prev => {
                                    return { ...prev, email: e.target.value }
                                })}
                            />
                            {/* password */}
                            <input
                                type="password"
                                placeholder='password'
                                value={input.password}
                                onChange={(e) => setInput(prev => {
                                    return { ...prev, password: e.target.value }
                                })}
                            />


                            {
                                isRegistering ? (<>
                                    <div style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                        <div className="deleteLoader">
                                            <div className="loader"></div>
                                        </div>
                                    </div>
                                </>) : (
                                    <button className="button" onClick={handleRegister} >Sign Up</button>
                                )
                            }


                            {/* login switch */}
                            <span className='loginText' >Already have an account?
                                Click here to <Link to={"/auth/login"}> Login.</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register