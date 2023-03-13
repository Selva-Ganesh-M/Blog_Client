import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./updateBlog.css"
import { app } from '../../firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { TStoreDispatch, rootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost } from '../../redux/slices/postsSlice';


type Props = {}

type TBlog = { title: string, content: string, tags: string }

const UpdateBlog = (props: Props) => {
    // grabbing
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch: TStoreDispatch = useDispatch()
    const post = useSelector((state: rootState) => selectPostById(state, id!))

    // declarations
    const [image, setImage] = useState<any>(null)
    const [imagePer, setImagePer] = useState<number>(0)
    const [imgUrl, setImgUrl] = useState<string>('')
    const [isUpdating, setIsUpdating] = useState<Boolean>(false)


    // formik handling
    const initialValues = {
        title: post?.title || "",
        content: post?.desc || "",
        tags: post?.category || "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("title is a required field"),
        content: Yup.string().required("title is a required field"),
        tags: Yup.string()
    })

    const customError = (msg: string) => {
        return <div style={{ color: "red" }} >{`* ${msg}`}</div>;
    };

    const handleFormSubmit = async (values: TBlog, { setSubmitting, resetForm }: any) => {
        setIsUpdating(true)
        console.log({ ...values, imgUrl });
        const data = {
            title: values.title,
            category: values.tags,
            desc: values.content,
            cover: imagePer === 100 ? imgUrl : undefined,
            _id: post?._id
        }
        await dispatch(updatePost(data))
        resetForm();
        setIsUpdating(false)
        navigate("/blogs")

    }



    // functions
    // handle firebase image upload
    const uploadFile = async (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().toString() + file.name
        const storageRef = ref(storage, "blogImages/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePer(Math.floor(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }

    useEffect(() => {
        // uploading img to firebase
        image && uploadFile(image)

        return () => {
            setImagePer(0)
            setImage(null)
            setIsUpdating(false)
        }
    }, [image])


    return (
        (
            <section className="new__Blog">
                {/* header */}
                <div className="new__blog-form">
                    <h1>Update Blog </h1>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <Form onSubmit={handleSubmit} className="form">

                                {/* title */}
                                <div className="item">
                                    <Field
                                        className="field"
                                        type="string"
                                        name="title"
                                        placeholder="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <ErrorMessage name={"username"}>{customError}</ErrorMessage>

                                {/* content */}
                                <div className="item">
                                    <textarea
                                        rows={5}
                                        className="field "
                                        name="content"
                                        placeholder="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <ErrorMessage name={"username"}>{customError}</ErrorMessage>

                                {/* tags */}
                                <div className="item">
                                    <Field
                                        className="field"
                                        type="string"
                                        name="tags"
                                        placeholder="tags"
                                        value={values.tags}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <ErrorMessage name={"username"}>{customError}</ErrorMessage>


                                {/* image */}
                                <div className="image__upload-container">

                                    {/* upload meter */}
                                    <div>{imagePer}%</div>

                                    <input
                                        style={{
                                            marginBottom: "1rem"
                                        }}
                                        className='image_input'
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={(e) => {
                                            console.log(e.target.files);
                                            e.target.files ? setImage(e.target.files[0]) : ""
                                        }
                                        }
                                    />


                                </div>

                                {/* update button */}
                                {
                                    isUpdating ? (
                                        <div style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            <div className="deleteLoader">
                                                <div className="loader"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <button type={
                                            image ?
                                                imgUrl ? "submit" : "button"
                                                : "submit"
                                        } className='submit-btn' >
                                            Update
                                        </button>
                                    )
                                }


                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        )
    )
}

export default UpdateBlog