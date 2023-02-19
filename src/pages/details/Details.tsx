import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blog } from '../../assets/data/data'
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"

import "./details.css"

type Props = {}

export type TBlog = {
    id: number,
    title: string;
    desc: string;
    category: string;
    cover: string;
    date: string;
}

// functional components
const Details = (props: Props) => {

    // declarations
    const { id } = useParams()
    console.log("id", id);

    // states
    const [currentBlog, setCurrentBlog] = useState<TBlog>()

    // side effects
    useEffect(() => {
        if (id) {
            setCurrentBlog(blog.find(item => item.id === parseInt(id)))
        }
        return () => {
            setCurrentBlog(undefined)
        }
    }, [location])

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
                                        <Link to={`/blogs/update/${currentBlog.id}`}>
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