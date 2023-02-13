import React from 'react'
import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineTags } from 'react-icons/ai';
import { Link } from 'react-router-dom'

type Props = {
    item: {
        id: number;
        title: string;
        desc: string;
        category: string;
        cover: string;
        date: string;
    }
}

const SingleBlog = ({ item }: Props) => {
    return (
        // individual blogs
        <div className="box boxItems" key={item.id} >
            <Link to={`/blogs/view/${item.id}`}>
                <div className="img">
                    <img src={item.cover} alt="blog image" className='zoomingImg  ' />
                </div>
            </Link>
            <div className="details">

                {/* tags */}
                <div className="tag">
                    <AiOutlineTags className='icon' />
                    <a href="#">{item.category}</a>
                </div>

                {/* title */}
                <Link style={{ color: "#000" }} to={`/blogs/view/${item.id}`} >
                    <h3>{item.title}</h3>
                </Link>

                {/* desctionption */}
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
        </div >
    )
}

export default SingleBlog