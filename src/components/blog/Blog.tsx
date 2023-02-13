import React from 'react'
import { blog } from '../../assets/data/data'
import "./blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from 'react-router-dom'
import SingleBlog from './SingleBlog'

type Props = {}

const Blog = (props: Props) => {
    return (
        <section className="blog">
            <div className="container grid3">
                {
                    blog.map((item) => (
                        <SingleBlog item={item} key={item.id} />
                    ))
                }
            </div>
        </section>
    )
}

export default Blog