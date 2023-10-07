import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick";
import img1 from "../../img/slider-image-1.jpeg"
import img2 from "../../img/slider-image-3.jpeg"
import img3 from "../../img/grocery-banner-2.jpeg"
import img4 from "../../img/slider-2.jpeg"


export default function MainSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <div className="container py-4 my-4">
                <div className="row gx-0">
                    <div className="col-md-9">
                        <Slider {...settings}>
                            <div>
                                <img className={`${style.sliderImg} w-100`} src={img1} alt="" />
                            </div>
                            <div>
                                <img className={`${style.sliderImg} w-100`} src={img2} alt="" />
                            </div>
                        </Slider>
                    </div>
                    <div className="col-md-3">
                    <img className={`${style.fixedImg} w-100`} src={img3} alt="" />
                    <img className={`${style.fixedImg} w-100`} src={img4} alt="" />
                    </div>
                </div>
            </div>


        </>
    )
}
