import React from 'react'
import { category } from '../../assets/data/data'
import "./categories.css"

type Props = {}

const Categories = (props: Props) => {
    return (
        <>
            <div className="section">
                <div className="boxs">
                    {
                        category.map(item => (
                            <div className="boxs" key={item.id}>
                                <div className="box">
                                    <img src={item.cover} alt="blog-img" />
                                </div>
                                <div className="overlay">
                                    <h4>{item.category}</h4>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Categories