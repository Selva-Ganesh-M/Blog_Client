import React, { useEffect } from 'react'
import "./header.css"
import logo from "../../assets/images/logo.svg"
import { Link } from 'react-router-dom'
import { nav } from "../../assets/data/data"
import User from '../user/user'

type Props = {}

const Header = (props: Props) => {
    //#region : declarations

    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    // navbar fixer
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const header = document.querySelector(".header") as HTMLDivElement
    //         header?.classList.toggle("active", window.scrollY > 100)
    //     }
    //     window.addEventListener("scroll", handleScroll)
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll)
    //     }
    // }, [])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <>
            {/* header */}
            <header className='header'>
                <div className="container flex">
                    {/* logo container */}
                    <div className="logo">
                        <img src={logo} alt="logo" width={"100px"} />
                    </div>

                    {/* nav links container */}
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
                    <div className="account flexCenter">
                        <User />
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header