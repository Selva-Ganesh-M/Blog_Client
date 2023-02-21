import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { selectPostById, TPost } from '../../redux/slices/postsSlice'
import { rootState } from '../../redux/store'

import "./details.css"
import { useSelector } from 'react-redux'

type Props = {}


// functional components
const Details = (props: Props) => {

    // declarations
    const navigate = useNavigate()
    const { id } = useParams()
    const currentBlog = useSelector((state: rootState) => selectPostById(state, id!))


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
                            <div className="left">
                                <img src={currentBlog.cover} alt="blog-image" />
                            </div>

                            {/* right side */}
                            <div className="right">
                                {/* title and actions  */}
                                <div className='tanda'>
                                    <h1>{currentBlog.title}</h1>
                                    <div className="buttons">
                                        <Link to={`/blogs/update/${currentBlog._id}`}>
                                            <button className="button">
                                                <BsPencilSquare />
                                            </button>
                                        </Link>
                                        <button className="button">
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
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