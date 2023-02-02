import React from 'react'
import { blog } from '../../assets/data/data'
import "./blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from 'react-router-dom'

type Props = {}

const Blog = (props: Props) => {
    return (
        <section className="blog">
            <div className="container grid3">
                {
                    blog.map(item => (
                        // individual blogs
                        <Link to={`/details/${item.id}`} className="box boxItems" key={item.id} >
                            <div className="img">
                                <img src={item.cover} alt="blog image" />
                            </div>
                            <div className="details">
                                <div className="tag">
                                    <AiOutlineTags className='icon' />
                                    <a href="#">{item.category}</a>
                                </div>
                                <Link style={{ color: "#000" }} to={`/details/${item.id}`}>
                                    <h3>{item.title}</h3>
                                </Link>
                                <p>{item.desc.slice(0, 180)}...</p>
                                <div className="date">
                                    <div>
                                        <AiOutlineClockCircle className="icon" />
                                        <label>{item.date}</label>
                                    </div>
                                    <div>
                                        <AiOutlineComment className="icon" />
                                        <label>27</label>
                                    </div>
                                    <div>
                                        <AiOutlineShareAlt className="icon" />
                                        <label>SHARE</label>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default Blog