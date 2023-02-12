import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'

type Props = {}

const AuthLayout = (props: Props) => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default AuthLayout