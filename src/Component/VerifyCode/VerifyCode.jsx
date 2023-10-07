import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    let [isLoading, setIsLoading] = useState(false);
    let [errMessage, setErrMessage] = useState(null);
    let navigate = useNavigate();

    let initialValues = {
        resetCode: "",
    }

    async function verifyCode(values) {
        setIsLoading(true);
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).catch((err) => {
            setErrMessage(err.response.data.message);
            setIsLoading(false);
        });

        if (data.status === "Success") {
            setIsLoading(false);
            navigate("/resetPassword");
        }
    }

    let formik = useFormik({
        initialValues,

        onSubmit: (values) => verifyCode(values),
    })

    return (
        <section className='py-5'>
            <div className="container">
                {errMessage ? <div className='alert alert-danger'>{errMessage}</div> : ""}
                <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
                    <label htmlFor="resetCode">Your Verify Code:</label>
                    <input className='form-control mb-2'
                        type="text"
                        id='resetCode'
                        name='resetCode'
                        value={formik.resetCode}
                        onChange={formik.handleChange}
                    />
                    <button type='submit' className='btn btn-success main-btn'>{isLoading ? (<i className='fa-solid fa-spin fa-spinner'></i>) : ("Verify")}</button>
                </form>
            </div>
        </section>
    )
}
