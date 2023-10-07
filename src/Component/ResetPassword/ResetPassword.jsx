import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'

export default function ForgotPassword() {
  let [isLoading, setIsLoading] = useState(false);
  let [errMessage, setErrMessage] = useState(null);
  const { userToken, setUserToken } = useContext(AuthContext)
  let navigate = useNavigate();

  let initialValues = {
    email: "",
    newPassword: "",
  }

  async function changePassword(values) {

    setIsLoading(true);
    let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values).catch((err) => {
      setErrMessage(err.response.data.message);

      setIsLoading(false);
    });


    localStorage.setItem("userToken", data.token)
    setUserToken(data.token)
    setIsLoading(false);
    navigate("/");

  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email Is required").email("Invalid Email"),
    password: Yup.string().required("Password Is required").matches(/^[A-Z][a-z0-9]{3,8}$/i, "Invalid Password"),
  })

  let formik = useFormik({
    initialValues,

    validationSchema,

    onSubmit: (values) => changePassword(values),
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

          <label htmlFor="newPassword">New Password:</label>
          <input
            className='form-control mb-2'
            type="password"
            name='newPassword'
            id='newPassword'
            value={formik.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className='alert alert-danger'>{formik.errors.newPassword}</div>
          )}

          <button type='submit' className='btn btn-success main-btn'>{isLoading ? (<i className='fa-solid fa-spin fa-spinner'></i>) : ("Change Password")}</button>
        </form>
      </div>


    </section>
  )
}
