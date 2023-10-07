import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import "./CategorySlider.module.css"
import Slider from "react-slick";

export default function CategorySlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7
    };

    function getCategory() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    let { data } = useQuery("categories", getCategory);

    return (
        <div className='container py-4'>
            <Slider {...settings}>
                {data?.data?.data.map((cat) => <>
                    <img height={200} className='w-100' src={cat.image} alt="" />
                    <h5 className='text-center'>{cat.name}</h5>
                </>)}
            </Slider>
        </div>
    )
}
