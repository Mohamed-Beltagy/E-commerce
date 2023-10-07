import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link} from 'react-router-dom';
import Loading from "../Loading/Loading"

export default function Card() {
  const [cartProduct, setcartProduct] = useState(null);
  const { getProductToCart, deleteProductFromCart, updateCartProductQuantity, setProductNumber, productNumber,isLoading, setIsLoading } = useContext(CartContext);

  async function displayProductCart() {
    setIsLoading(true);

    let { data } = await getProductToCart("cart");

    if (data.status === "success") {
      setIsLoading(false);
      setProductNumber(data.numOfCartItems);
      setcartProduct(data);
    }
  }

  async function removeSpecificCartItem(list, id) {
    setIsLoading(true);
    let { data } = await deleteProductFromCart(list, id);
    if (data.status === "success") {
      setIsLoading(false);
      setProductNumber(data.numOfCartItems);
      setcartProduct(data);
    }
  }

  async function updateQuantity(id, count) {
    let { data } = await updateCartProductQuantity(id, count);
    if (data.status === "success") {
      setcartProduct(data);
    }
  }

  useEffect(() => {
    displayProductCart();
  }, [])

  if (productNumber == 0) {
    return (
      <section className='py-5'>
        <div className="container bg-body-tertiary py-5 ">
          <h1>Cart Shop</h1>
          <h2>your cart is empty</h2>
        </div>
      </section>
    )
  }

  if (productNumber != 0) {
    return (
      <section className='py-5'>
        <div className="container bg-body-tertiary ">

          {isLoading && (<><Loading /></>)}
          <div className='d-flex justify-content-between align-items-center'>
            <h1>Cart Shop</h1>

            {productNumber ? (<Link to={`/checkOut/${cartProduct?.data._id} `} className='btn bg-success text-white mt-2'>Check Out</Link>) : ('')}
          </div>

          {cartProduct && (<>

            <div className='d-flex justify-content-between mt-3'>
              <h3>Total Price: <span className='text-success'>{cartProduct.data.totalCartPrice}</span></h3>
              <h3>Total Numbers: <span className='text-success'>{cartProduct.numOfCartItems}</span></h3>
            </div>

            {cartProduct.data.products.map(product => (
              <div key={product.product.id} className='row py-3 border-bottom align-items-center'>
                <div className='col-md-1'>
                  <img className='w-100' src={product.product.imageCover} alt="" />
                </div>
                <div className='col-md-11'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <h4>{product.product.title}</h4>
                      <h5 className='text-success'>{product.price} EGP</h5>
                      <button onClick={() => removeSpecificCartItem("cart", product.product.id)} className='btn text-danger'><i className='fa-solid fa-trash me-2'></i> Remove</button>
                    </div>
                    <div className='d-flex justify-content-around align-items-center'>
                      <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
                      <span className='mx-3'>{product.count}</span>
                      <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>
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
}
