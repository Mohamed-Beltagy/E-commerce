import { useParams } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';

export default function CheckOut() {
    let userToken = localStorage.getItem("userToken");
    let { id } = useParams();
    let [isLoading, setIsLoading] = useState(false);

    function PayNow(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,

            {
                shippingAddress,
            },

            {

                headers: {
                    token: userToken
                }
            }
        ).then(res => res).catch(err => err)
    }

    async function payment(shippingAddress) {
        setIsLoading(true);
        let { data } = await PayNow(shippingAddress);
        if (data.status === "success") {
            setIsLoading(false);
            window.location.href = data.session.url;
        }
    }

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },

        onSubmit: payment
    })

    return (
        <section className='py-5'>
            <div className="container">
                
                <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>

                    <label htmlFor="details">details:</label>
                    <input
                        className='form-control mb-2'
                        type="text"
                        name='details'
                        id='details'
                        value={formik.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.details && formik.touched.details && (
                        <div className='alert alert-danger'>{formik.errors.details}</div>
                    )}

                    <label htmlFor="phone">phone:</label>
                    <input
                        className='form-control mb-2'
                        type="text"
                        name='phone'
                        id='phone'
                        value={formik.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                        <div className='alert alert-danger'>{formik.errors.phone}</div>
                    )}

                    <label htmlFor="city">city:</label>
                    <input
                        className='form-control mb-2'
                        type="text"
                        name='city'
                        id='city'
                        value={formik.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.city && formik.touched.city && (
                        <div className='alert alert-danger'>{formik.errors.city}</div>
                    )}

                    <button type='submit' className='btn btn-success main-btn'>{isLoading ? (<i className='fa-solid fa-spin fa-spinner'></i>) : ("Pay Now")}</button>
                </form>
            </div>
        </section>
    )
}
