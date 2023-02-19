import React, { useEffect } from 'react'
import Blog from '../../components/blog/Blog'
import Categories from '../../components/categories/Categories'

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