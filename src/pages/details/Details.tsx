import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { deletePost, selectPostById, TPost } from '../../redux/slices/postsSlice'
import { rootState, TStoreDispatch } from '../../redux/store'

import "./details.css"
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
import RegisterLoadingScreen from '../../components/loadingScreens/RegisterLoadingScreen'

type Props = {}


// functional components
const Details = (props: Props) => {

    // declarations
    const navigate = useNavigate()
    const { id } = useParams()
    const currentBlog = useSelector((state: rootState) => selectPostById(state, id!))
    const user = useSelector(getUser)
    const dispatch: TStoreDispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState<Boolean>(false)
    const [isMovingToEditPage, setIsMovingToEditPage] = useState<Boolean>(false)

    // custom declarations
    const handleDelete = async (id: string) => {
        setIsDeleting(true)
        await dispatch(deletePost(id))
        setIsDeleting(false)
        navigate("/blogs")
    }

    // states

    // side effects
    useEffect(() => {
        if (!id) navigate("/blogs")
        console.log("id value is:", id);
        console.log("current blog is:", currentBlog);
        return () => {
            console.log("empty effect cleanup");
        }
    }, [])

    useEffect(() => {
        console.log("effect-currentblog:", currentBlog);
        return () => {
            console.log("current blog effect cleanup");
        }
    }, [currentBlog])

    // cleanup
    useEffect(() => {
        return () => {
            setIsMovingToEditPage(false)
        }
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
                                                <Link to={`/blogs/update/${currentBlog._id}`} onClick={() => setIsMovingToEditPage(true)}>
                                                    <button className="button">
                                                        <BsPencilSquare />
                                                    </button>
                                                </Link>
                                                {
                                                    isDeleting ? (<>
                                                        <div style={{
                                                            padding: "0px 10px"
                                                        }}>
                                                            <div className="deleteLoader">
                                                                <div className="loader"></div>
                                                            </div>
                                                        </div>
                                                    </>) : (
                                                        <button className="button" onClick={() => handleDelete(currentBlog._id)}>
                                                            <AiOutlineDelete />
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        ) : (null)
                                    }
                                </div>
                                <p>{currentBlog.desc}{currentBlog.desc}{currentBlog.desc}</p>
                            </div>
                        </div>
                    </section>
                ) : (<>
                    <RegisterLoadingScreen />
                </>)
            }
        </>
    )
}

export default Details