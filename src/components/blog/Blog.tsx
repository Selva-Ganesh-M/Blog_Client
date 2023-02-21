import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, getPosts } from '../../redux/slices/postsSlice'
import { TStoreDispatch } from '../../redux/store'
import "./blog.css"
import SingleBlog from './SingleBlog'

type Props = {}

const Blog = (props: Props) => {
    //#region : declarations
    const dispatch: TStoreDispatch = useDispatch()
    const posts = useSelector(getAllPosts)
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section className="blog">
            <div className="container grid3">
                {
                    posts.length > 0 ? posts.map((item) => (
                        <SingleBlog item={item} key={item._id} />
                    ))
                        : "loading"
                }
            </div>
        </section>
    )
}

export default Blog