import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider({ children }) {
    const [productNumber, setProductNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let userToken = localStorage.getItem("userToken");

    function addProductToCart(list, productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/${list}`,
            {
                productId: productId
            }, {

            headers: {
                token: userToken
            }
        }
        ).then(res => res).catch(err => err)
    }

    function getProductToCart(list) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/${list}`,
            {

                headers: {
                    token: userToken
                }
            }
        ).then(res => res).catch(err => err)
    }

    function deleteProductFromCart(list, id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/${list}/${id}`,
            {

                headers: {
                    token: userToken
                }
            }
        ).then(res => res).catch(err => err)
    }

    function updateCartProductQuantity(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                count
            },

            {

                headers: {
                    token: userToken
                }
            }
        ).then(res => res).catch(err => err)
    }

    async function getInitialCart() {
        let { data } = await getProductToCart("cart");
        setProductNumber(data?.numOfCartItems)
    }

    useEffect(() => {
        getInitialCart();
    }, [])

    return <CartContext.Provider value={{ addProductToCart, getProductToCart, deleteProductFromCart, updateCartProductQuantity, productNumber, setProductNumber,isLoading, setIsLoading }}>
        {children}
    </CartContext.Provider>
}