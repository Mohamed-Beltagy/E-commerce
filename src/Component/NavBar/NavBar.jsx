import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../Context/AuthContext'
import logo from "../../img/freshcart-logo.svg"
import { CartContext } from '../Context/CartContext'

export default function NavBar() {
    const { productNumber } = useContext(CartContext)
    const { userToken, setUserToken } = useContext(AuthContext)
    let navigate = useNavigate();

    function logout() {
        localStorage.removeItem("userToken");
        setUserToken(null);
        navigate("/Login")
    }

    return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
            <Link className="navbar-brand" to="/"><img className='w-100' src={logo} alt="" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                    {userToken && (<> <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wishList">Wish List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Brands">Brands</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Categories">Categories</Link>
                        </li> </>)}
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    {!userToken ?
                        (<>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login">LogIn</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Register">Register</Link>
                            </li>
                        </>)

                        : (
                            <>
                                <li class="nav-item position-relative">
                                    <Link class="nav-link" to="/Cart">
                                        <i class="fa-solid fa-cart-shopping fs-3"></i>
                                        <div class="badge position-absolute text-white top-0 end-0 bg-success">{productNumber? (productNumber):("0")}</div>
                                    </Link></li>


                                <li>
                                    <span onClick={logout} className="nav-link cursor-pointer">LogOut</span>
                                </li>
                            </>
                        )}
                </ul>

            </div>
        </div>
    </nav>
    )
}
