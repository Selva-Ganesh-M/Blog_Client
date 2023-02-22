import React, { useState, useEffect } from 'react'
import "./login.css"
import image from "../../../assets/images/input.png"
import loginBanner from "../../../assets/images/my-account.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { TStoreDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { getUser, loginUser } from '../../../redux/slices/userSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export type TLoginData = {
    email: string,
    password: string
}

type Props = {}

const Login = (props: Props) => {
    //#region : declarations
    const dispatch: TStoreDispatch = useDispatch()
    const user = useSelector(getUser)
    const navigate = useNavigate()
    //#endregion

    //#region : custom-declarations
    const [input, setInput] = useState<TLoginData>({ email: "", password: "" })

    //#endregion

    //#region : side-effects
    useEffect(() => {
        // redirect if there is user
        user.status ? navigate("/blogs") : null
        return () => { }
    }, [user])


    //#endregion

    //#region : functions
    const handleLogin = async () => {
        await dispatch(loginUser(input))
        navigate("/blogs")
        setInput({ email: "", password: '' })
    }

    //#endregion

    //jsx rendering
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
                            <button className="button" onClick={handleLogin} >Login</button>
                            {/* login switch */}
                            <span className='loginText' >Don't have an account?
                                Click here to <Link to={"/auth/register"}> Register.</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login