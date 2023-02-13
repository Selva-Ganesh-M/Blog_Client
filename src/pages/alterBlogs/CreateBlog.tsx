import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"
import "./createBlog.css"


type Props = {}

type TBlog = { title: string, content: string, tags: string }

const CreateBlog = (props: Props) => {



    // formik handling
    const initialValues = {
        title: "",
        content: "",
        tags: ""
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
        console.log(values);
    }




    return (
        (
            <section className="new__Blog">
                {/* header */}
                <div className="new__blog-form">
                    <h1>Create New Form </h1>
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
                                        rows={10}
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


                                {/* create button */}
                                <button type="submit" className='submit-btn' >
                                    Create
                                </button>


                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        )
    )
}

export default CreateBlog