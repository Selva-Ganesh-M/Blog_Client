import React, { useEffect } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUser } from '../../redux/slices/userSlice'
import Header from '../header/Header'

type Props = {}

const HomeLayout = (props: Props) => {
    const user = useSelector(getUser)
    const navigate = useNavigate()

    useEffect(() => {
        // if no user redirect to auth page
        if (!user.status) navigate("/auth/login", { replace: true })
    })

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HomeLayout