import React, { useEffect } from 'react'
import Blog from '../components/blog/Blog'
import Categories from '../components/categories/Categories'
import Header from '../components/header/Header'

type Props = {}

const Home = (props: Props) => {

    return (
        <>
            <Categories />
            <Blog />
        </>
    )
}

export default Home