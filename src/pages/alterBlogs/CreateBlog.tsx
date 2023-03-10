import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./createBlog.css"
import { app } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import { TStoreDispatch } from '../../redux/store';
import { createPost } from '../../redux/slices/postsSlice';


type Props = {}

type TBlog = { title: string, content: string, tags: string }

const CreateBlog = (props: Props) => {
    // grabbing
    const navigate = useNavigate()
    const user = useSelector(getUser)
    const dispatch: TStoreDispatch = useDispatch()

    // declarations
    const [image, setImage] = useState<any>(null)
    const [imagePer, setImagePer] = useState<number>(0)
    const [imgUrl, setImgUrl] = useState<string>('')
    const [isCreating, setIsCreating] = useState<Boolean>(false)

    // formik handling
    const initialValues = {
        title: "",
        content: "",
        tags: "",
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
        setIsCreating(true)
        console.log({ ...values, imgUrl, userId: user.details._id });
        await dispatch(createPost(
            {
                title: values.title,
                category: values.tags,
                desc: values.content,
                cover: imgUrl,
                userId: user.details._id
            }))
        resetForm();
        setIsCreating(true)
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


    // uploading img to firebase
    useEffect(() => {
        image && uploadFile(image)

        return () => {
            setImage("")
            setImagePer(0)
            setImagePer(0)
        }
    }, [image])


    return (
        (
            <section className="new__Blog">
                {/* header */}
                <div className="new__blog-form">
                    <h1>Create New Blog </h1>
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

                                {/* create button */}
                                {
                                    isCreating ? (
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
                                        <button type={imgUrl ? "submit" : "button"} className='submit-btn' >
                                            Create
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

export default CreateBlog