import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from "../Loading/Loading"
import style from "./Category.module.css"

export default function Categories() {

  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, data } = useQuery("mainCategories", getCategory);

  return (
    <section className='Py-5 my-5'>
      <div className="container">
        <div className="row gy-4">
          {isLoading && (<><Loading /></>)}
          {data?.data.data.map((product) => <div class="col-md-4">
            <div class="card">
              <div class="card-img">
                <img alt="" class={`${style.height}  w-100`} src={product.image} />
              </div>
              <div class="card-body">
                <p class="text-success h3 text-center">{product.name}</p>
              </div>
            </div>
          </div>)}

        </div>
      </div>
    </section>
  )
}
