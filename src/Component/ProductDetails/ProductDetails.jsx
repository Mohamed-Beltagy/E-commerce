import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify';

export default function ProductDetails() {
    const [details, setDetails] = useState(null)
    const { addProductToCart, setProductNumber } = useContext(CartContext)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const { id } = useParams();

    function getProductDetails() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((res) => {
            setDetails(res.data.data);
        })
    }

    async function addToCart(list, id) {
        let { data } = await addProductToCart(list, id)

        if (data.status === "success") {
            setProductNumber(data.numOfCartItems)
            toast(data.message);
        }
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    return (
        <section>
            <div className="container">
                {details && <div className="row align-items-center">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {details.images.map((img) => (<img key={id} src={img} alt="" />))}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <h2>{details.title}</h2>
                        <p>{details.description}</p>
                        <p>{details.category.name}</p>
                        <div className='d-flex justify-content-between'>
                            <h5>{details.price} EGP</h5>
                            <h5><i className='fas fa-star rating-color text-warning'></i> {details.ratingsAverage}</h5>
                        </div>
                        <button onClick={() => addToCart("cart", id)} className='btn btn-success text-white w-100 btn-sm mt-2'> add to cart</button>
                    </div>
                </div>}
            </div>

        </section>
    )
}
