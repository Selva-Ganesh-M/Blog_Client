import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { deletePost, selectPostById, TPost } from '../../redux/slices/postsSlice'
import { rootState, TStoreDispatch } from '../../redux/store'

import "./details.css"
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'

type Props = {}


// functional components
const Details = (props: Props) => {

    // declarations
    const navigate = useNavigate()
    const { id } = useParams()
    const currentBlog = useSelector((state: rootState) => selectPostById(state, id!))
    const user = useSelector(getUser)
    const dispatch: TStoreDispatch = useDispatch()

    // custom declarations
    const handleDelete = async (id: string) => {
        await dispatch(deletePost(id))
        navigate("/blogs")
    }

    // states

    // side effects
    useEffect(() => {
        if (!id) navigate("/blogs")
    }, [])

    // return jsx
    return (
        <>
            {
                currentBlog ? (
                    <section className="detailSection">
                        {/* wrapper */}
                        <div className="container">
                            {/* left side */}
                            <div className="left"  >
                                <img style={{ backgroundColor: "#999" }} src={currentBlog.cover} alt="blog-image" />
                            </div>

                            {/* right side */}
                            <div className="right">
                                {/* title and actions  */}
                                <div className='tanda'>
                                    <h1>{currentBlog.title}</h1>
                                    {
                                        user.details._id === currentBlog.userId ? (
                                            <div className="buttons">
                                                <Link to={`/blogs/update/${currentBlog._id}`}>
                                                    <button className="button">
                                                        <BsPencilSquare />
                                                    </button>
                                                </Link>
                                                <button className="button" onClick={() => handleDelete(currentBlog._id)}>
                                                    <AiOutlineDelete />
                                                </button>
                                            </div>
                                        ) : (null)
                                    }
                                </div>
                                <p>{currentBlog.desc}{currentBlog.desc}{currentBlog.desc}</p>
                            </div>
                        </div>
                    </section>
                ) : null
            }
        </>
    )
}

export default Details