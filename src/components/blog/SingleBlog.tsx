import React from 'react'
import { format } from "timeago.js"
import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineTags } from 'react-icons/ai';
import { FiThumbsUp } from "react-icons/fi"
import { FaThumbsUp } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { dislikePost, likePost, selectPostById, TPost } from '../../redux/slices/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import { rootState, TStoreDispatch } from '../../redux/store';

type Props = {
    item: string
}

const SingleBlog = ({ item: id }: Props) => {
    //#region : declarations
    const user = useSelector(getUser)
    const dispatch: TStoreDispatch = useDispatch()
    const item = useSelector((state: rootState) => selectPostById(state, id))!
    //#endregion

    console.log("single blog re-rendered:", item);

    //#region : custom-declarations

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions
    // handle like
    const handleLike = () => {
        dispatch(likePost({ userId: user.details._id, postId: item._id }))
    }

    // dislike
    const handleDislike = () => {
        dispatch(dislikePost({ userId: user.details._id, postId: item._id }))
    }

    //#endregion

    //jsx rendering
    return (
        // individual blogs
        <div className="box boxItems" key={item._id} >
            <Link to={`/blogs/view/${item._id}`}>
                <div className="img">
                    <img src={item.cover} alt="blog image" className='zoomingImg  ' />
                </div>
            </Link>
            <div className="details" style={{ flex: 1, height: "auto" }} >

                {/* tags */}
                <div className="tag">
                    <AiOutlineTags className='icon' />
                    <a href="#">{item.category}</a>
                </div>

                {/* title */}
                <Link style={{ color: "#000" }} to={`/blogs/view/${item._id}`} >
                    <h3>{item.title}</h3>
                </Link>

                {/* desctionption */}
                <p style={{ minHeight: "100.5px" }} >{item.desc.slice(0, 180)}...</p>



                <div className="date">
                    <div>
                        <AiOutlineClockCircle className="icon" />
                        <label>{format(item.createdAt)}</label>
                    </div>
                    <div>
                        {
                            item.likes.includes(user.details._id) ? (
                                // liked
                                <FaThumbsUp className="icon" onClick={handleDislike} />
                            ) : (
                                // disliked
                                <FiThumbsUp className="icon" onClick={handleLike} />
                            )
                        }
                        <label>{item.likes.length}</label>
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

export default React.memo(SingleBlog)