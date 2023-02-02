import React from 'react'
import { category } from '../../assets/data/data'
import "./categories.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md"
import { MdNavigateBefore } from "react-icons/md"

type Props = {}

const SampleNextArrow = (props: any) => {
    const { onClick } = props
    return (
        <div className="control-button next">
            <button className='next-btn' onClick={onClick}>
                <MdNavigateNext className={"icon"} />
            </button>
        </div>
    )
}

const SampleBeforeArrow = (props: any) => {
    const { onClick } = props
    return (
        <div className="control-button before" >
            <button className='before-btn' onClick={onClick}>
                <MdNavigateBefore className={"icon"} />
            </button>
        </div>
    )
}
const Categories = (props: Props) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleBeforeArrow />,
        responsive: [
            {
                breakpoint: 786,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    return (
        <>
            <section className="category">
                <div className="content">
                    <Slider className={'slider'} {...settings}>

                        {
                            category.map(item => (
                                <div className="boxs" key={item.id}>
                                    <div className="box">
                                        <img src={item.cover} alt="blog-img" />
                                    </div>
                                    <div className="overlay">
                                        <div className='center'>
                                            <h4>{item.category}</h4>
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default Categories