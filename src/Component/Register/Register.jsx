import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [errMessage, setErrMessage] = useState(null);
  let navigate = useNavigate();


  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }

  let validationSchema = Yup.object({
    name: Yup.string().required("Name Is required").min(3, "Name must be more than 3 char").max(15, "Name must be less than 15 char"),
    email: Yup.string().required("Email Is required").email("Invalid Email"),
    phone: Yup.string().required("Phone Is required").matches(/^(\+2){0,1}01[0125][0-9]{8}$/i, "Invalid Phone"),
    password: Yup.string().required("Password Is required").matches(/^[A-Z][a-z0-9]{3,8}$/i, "Invalid Password"),
    rePassword: Yup.string().required("rePassword Is required").oneOf([Yup.ref("password")])
  })

  async function Register(values) {
    setIsLoading(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).catch((err) => {
      setErrMessage(err.response.data.message);
      setIsLoading(false);
    });

    if (data.message === "success") {
      setIsLoading(false);
      navigate("/Login");
    }
  }

  let formik = useFormik({
    initialValues,

    validationSchema,

    onSubmit: (values) => Register(values)
  })


  return (
    <section className='py-5'>
      <div className="container">
        {errMessage ? <div className='alert alert-danger'>{errMessage}</div> : ""}
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
          <label htmlFor="name">Name:</label>
          <input
            className='form-control mb-2'
            type="text"
            name='name'
            id='name'
            value={formik.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className='alert alert-danger'>{formik.errors.name}</div>
          )}

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

          <label htmlFor="phone">Phone:</label>
          <input className='form-control mb-2'
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

          <label htmlFor="rePassword">RePassword:</label>
          <input
            className='form-control mb-2'
            type="password"
            name='rePassword'
            id='rePassword'
            value={formik.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className='alert alert-danger'>{formik.errors.rePassword}</div>
          )}

          <button type='submit' className='btn btn-success main-btn'>{isLoading ? (<i className='fa-solid fa-spin fa-spinner'></i>) : ("Register")}</button>

        </form>
      </div>
    </section>
  )
}
