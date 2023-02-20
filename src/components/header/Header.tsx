import React, { useEffect } from 'react'
import "./header.css"
import logo from "../../assets/images/logo.svg"
import { Link } from 'react-router-dom'
import { nav } from "../../assets/data/data"
import User from '../user/user'
import { getUser } from '../../redux/slices/userSlice'
import { useSelector } from "react-redux";

type Props = {}

const Header = (props: Props) => {
    const user = useSelector(getUser)
    return (
        <>
            {/* header */}
            <header className='header'>
                <div className="container flex">
                    {/* logo container */}
                    <Link to="/blogs" className="logo">
                        <img src={logo} alt="logo" width={"100px"} />
                    </Link>

                    {/* nav links container */}
                    {
                        user.status && (
                            <nav>
                                <ul>
                                    {nav.map(item => (
                                        <li key={item.id}>
                                            <Link style={{ color: "inherit" }} to={item.url}>
                                                {item.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )
                    }

                    {/* user img */}
                    <div className="account flexCenter">
                        <User />
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header