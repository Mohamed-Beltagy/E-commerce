import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify';
import Loading from "../Loading/Loading"

export default function FeaturedProduct() {
    const { addProductToCart, setProductNumber } = useContext(CartContext);
    const [q, setQ] = useState("");

    function getProduct() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    let { isLoading, data } = useQuery("product", getProduct);

    async function addToCart(list,id) {
        let { data } = await addProductToCart(list,id);

        if (data.status === "success") {
            setProductNumber(data.numOfCartItems);
            toast(data.message);
        }
    }
    
    async function addToWish(list,id) {
        let { data } = await addProductToCart(list,id);

        if (data.status === "success") {
            toast(data.message);
        }
    }

    return (
        <section className='py-5'>
            <div className="container">
                <input onChange={(e) => setQ(e.target.value)} className="form-control mb-4 w-75 m-auto" type="text" placeholder="Search..." />
                <div className="row">
                    {isLoading && (<><Loading /></>)}
                    {
                        data?.data.data.filter((product) => product.title.toLowerCase().includes(q)).map((product) => <div key={product.id} className='col-md-3 product rounded pb-1'>
                            <Link to={`/Product-Ditails/${product.id}`}>  <div className='py-3 px-2'>
                                <img className='w-100' src={product.imageCover} alt={product.title} />
                                <span className='text-success'>{product.category.name}</span>
                                <h3 className='h6 my-3 text-black'>{product.title.split(" ").slice(0, 2).join(' ')}</h3>
                                <div className='d-flex justify-content-between mt-3'>
                                    <span className="text-black">{product.price} EGP</span>
                                    <span className="text-black"><i className='fas fa-star rating-color text-warning'></i> {product.ratingsAverage}</span>
                                </div>
                            </div>
                            </Link>
                            <div className="d-flex">
                            <button onClick={() => addToCart("cart",product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'> add to cart</button>
                            <i  onClick={() => addToWish("wishlist",product.id)}  className="fa-solid fa-heart btn"></i>
                            </div>
                            
                        </div>
                        )}
                </div>
            </div>
        </section>
    )

}
