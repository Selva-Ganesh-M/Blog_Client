import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getAllPosts, getMyBlogs, getPosts, TPost } from '../../redux/slices/postsSlice'
import { getUser } from '../../redux/slices/userSlice'
import { TStoreDispatch } from '../../redux/store'
import "./blog.css"
import SingleBlog from './SingleBlog'
import { rootState } from '../../redux/store'

type Props = {}

const Blog = (props: Props) => {



    //#region : declarations
    const dispatch: TStoreDispatch = useDispatch()
    const posts = useSelector(getAllPosts)
    const myPosts = useSelector((state: rootState) => state.posts.myBlogs)
    const location = useLocation()
    const user = useSelector(getUser)
    //#endregion

    console.log("blog re-rendered:", posts);

    //#region : custom-declarations
    const [content, setContent] = useState<TPost[]>([])

    //#endregion

    //#region : side-effects
    useEffect(() => {
        if (location.pathname.split("/")[2] === "myblogs") {
            dispatch(getMyBlogs(user.details._id))
            setContent(myPosts)
        } else {
            setContent(posts)
        }

        // clean up
        return () => {
            setContent([])
        }
    }, [location.pathname])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section className="blog">

            {
                content.length > 0 ? (
                    <div className="container grid3">
                        {
                            content.map((item) => <SingleBlog item={item._id} key={item._id} />)
                        }

                    </div>
                )
                    : <>
                        <div style={{
                            display: "flex",
                            width: "100%",
                            margin: "0 auto",
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <button
                                className='button'
                                style={{ padding: "1rem" }}>
                                Create your first blog
                            </button>
                        </div>
                    </>
            }

        </section>
    )
}

export default Blog