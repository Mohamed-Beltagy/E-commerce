import React from 'react'
import img from "../../img/error.svg"

export default function NotFound() {
  return (
    <section>
      <div className="container d-flex justify-content-center align-items-center">
        <img className='w-75' src={img} alt="" />
      </div>
    </section>
  )
}
