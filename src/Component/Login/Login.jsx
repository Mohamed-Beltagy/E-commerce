import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [errMessage, setErrMessage] = useState(null);
  let navigate = useNavigate();
let {setUserToken} =useContext(AuthContext)

  let initialValues = {
    email: "",
    password: "",
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email Is required").email("Invalid Email"),
    password: Yup.string().required("Password Is required").matches(/^[A-Z][a-z0-9]{3,8}$/i, "Invalid Password"),
  })

  async function Login(values) {
    setIsLoading(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).catch((err) => {
      setErrMessage(err.response.data.message);
      setIsLoading(false);
    });

    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken",data.token)
      setUserToken(data.token)
      navigate("/");
    }
  }

  let formik = useFormik({
    initialValues,

    validationSchema,
    onSubmit: (values) => Login(values)
  })

  return (
    <section className='py-5'>
      <div className="container">
        {errMessage ? <div className='alert alert-danger'>{errMessage}</div> : ""}
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>

          <label htmlFor="email">Email:</label>
          <input
            className='form-control mb-2'
            type="text"
            name='email'
            id='email'
            value={formik.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className='alert alert-danger'>{formik.errors.email}</div>
          )}

          <label htmlFor="password">Password:</label>
          <input
            className='form-control mb-2'
            type="password"
            name='password'
            id='password'
            value={formik.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className='alert alert-danger'>{formik.errors.password}</div>
          )}
<div className='d-flex justify-content-between'>
<button type='submit' className='btn btn-success main-btn'>{isLoading ? (<i className='fa-solid fa-spin fa-spinner'></i>) : ("Login")}</button>
<Link to="/forgetPassword">Forget your password</Link>
</div>

        </form>
      </div>
    </section>
  )
}
