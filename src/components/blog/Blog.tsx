import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllPosts, getMyBlogs, getPosts, TPost } from '../../redux/slices/postsSlice'
import { getUser } from '../../redux/slices/userSlice'
import { rootState, TStoreDispatch } from '../../redux/store'
import "./blog.css"
import SingleBlog from './SingleBlog'
import { clearPosts } from '../../redux/slices/postsSlice'
import RegisterLoadingScreen from '../loadingScreens/RegisterLoadingScreen'

type Props = {}

const Blog = (props: Props) => {



    //#region : declarations
    const navigate = useNavigate()
    const dispatch: TStoreDispatch = useDispatch()
    const posts = useSelector(getAllPosts)
    const isLoading = useSelector((store: rootState) => store.posts.loading)
    // const myPosts = useSelector((state: rootState) => state.posts.myBlogs)
    const location = useLocation()
    const user = useSelector(getUser)
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    useEffect(() => {
        if (location.pathname === "/blogs") {
            dispatch(getPosts())
        }
        if (location.pathname === "/blogs/myblogs") {
            dispatch(getMyBlogs(user.details._id))
        }


        // clean up
        return () => {
            dispatch(clearPosts())
        }
    }, [location.pathname, user])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section className="blog">

            {
                !isLoading ? (
                    <>
                        {
                            posts.length > 0 ? (
                                <div className="container grid3">
                                    {
                                        posts.map((item) => <SingleBlog item={item._id} key={item._id} />)
                                    }

                                </div>
                            ) : (
                                <>
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
                            )
                        }
                    </>
                )
                    : <>
                        <RegisterLoadingScreen />
                    </>
            }

        </section>
    )
}

export default Blog