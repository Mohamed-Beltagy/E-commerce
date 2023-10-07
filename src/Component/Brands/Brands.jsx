import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from "../Loading/Loading"

export default function Brands() {

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { isLoading, data } = useQuery("brands", getBrands);

  return (
    <section className='Py-5 my-5'>
      <div className="container">
        <div className="row gy-4">
          {isLoading && (<><Loading /></>)}
          {data?.data.data.map((product) => <div className="col-md-3">
            <div className="card">
              <div className="card-img">
                <img className="img-fluid" src={product.image} />
              </div>
              <div className="card-body">
                <p className="text-center">{product.name}</p>
              </div>
            </div>
          </div>)}

        </div>
      </div>
    </section>
  )
}
