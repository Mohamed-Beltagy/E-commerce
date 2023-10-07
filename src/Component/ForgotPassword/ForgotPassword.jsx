import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    let [isLoading, setIsLoading] = useState(false);
    let [errMessage, setErrMessage] = useState(null);
    let navigate = useNavigate();

    let initialValues = {
        email: "",
    }

    let validationSchema = Yup.object({
        email: Yup.string().required("Email Is required").email("Invalid Email"),
    })

    async function verifyEmail(values) {
        setIsLoading(true);
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).catch((err) => {
            setErrMessage(err.response.data.message);
            setIsLoading(false);
        });

        if (data.statusMsg === "success") {
            setIsLoading(false);
            navigate("/verifyCode");
        }
    }

    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => verifyEmail(values),
    })

    return (
        <section className='py-5'>
            <div className="container">
                {errMessage ? <div className='alert alert-danger'>{errMessage}</div> : ""}
                <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
                    <label htmlFor="email">Your Email:</label>
                    <input className='form-control mb-2'
                        type="email"
                        id='email'
                        name='email'
                        value={formik.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email && (
                        <div className='alert alert-danger'>{formik.errors.email}</div>
                    )}
                    <button type='submit' className='btn btn-success main-btn'>{isLoading ? (<i className='fa-solid fa-spin fa-spinner'></i>) : ("Verify")}</button>
                </form>
            </div>


        </section>
    )
}
