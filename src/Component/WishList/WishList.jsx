
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify';
import React, { useContext, useState, useEffect } from 'react'
import Loading from "../Loading/Loading"

export default function WishList() {
    const [cartProduct, setcartProduct] = useState(null);
    const { addProductToCart, getProductToCart, deleteProductFromCart, setProductNumber, isLoading, setIsLoading } = useContext(CartContext)

    async function displayProductCart() {
        setIsLoading(true)
        let { data } = await getProductToCart("wishlist");

        if (data.status === "success") {
            getInitialCart();
            setIsLoading(false)
            setcartProduct(data);
        }
    }

    async function removeSpecificCartItem(id) {
        setIsLoading(true)
        let { data } = await deleteProductFromCart("wishlist", id);
        if (data.status === "success") {
            setIsLoading(false)
            getInitialCart()
            setcartProduct(data);
        }
    }

    async function addToCart(list, id) {
        setIsLoading(true)
        let { data } = await addProductToCart(list, id)
        if (data.status === "success") {
            setIsLoading(false)
            getInitialCart();
            toast(data.message);
        }
    }

    async function getInitialCart() {
        let { data } = await getProductToCart("cart");
        setProductNumber(data.numOfCartItems)
    }

    function submitBtn(list, id) {
        addToCart(list, id)
        removeSpecificCartItem(id)
    }

    useEffect(() => {
        displayProductCart();
    }, [])

    return (
        <section className='py-5'>
            <div className="container bg-body-tertiary py-4 ">
                {isLoading && (<><Loading /></>)}
                <h1>My wish List</h1>

                {cartProduct && (<>

                    {cartProduct.data.map(product => (

                        <div key={product.id} className='row py-3 border-bottom align-items-center'>

                            <div className='col-md-1'>
                                <img className='w-100' src={product.imageCover} alt="" />
                            </div>

                            <div className='col-md-11'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h4>{product.title}</h4>
                                        <h5 className='text-success'>{product.price} EGP</h5>
                                        <button onClick={() => removeSpecificCartItem(product.id)} className='btn text-danger'><i className='fa-solid fa-trash me-2'></i> Remove</button>
                                    </div>
                                    <div className='d-flex justify-content-around align-items-center'>
                                        <button onClick={() => submitBtn("cart", product.id)} className='btn btn-outline-success'> add to cart</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </>)}

            </div>
        </section>
    )
}
