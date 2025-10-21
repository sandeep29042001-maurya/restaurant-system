import React, { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
     let {isLogin,setIsLogin,setUserId} =  useContext(LoginContext)
    let navigateTo = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg "style={{ backgroundColor: "#ff6600", color:"white" }} >
            <div className="container-fluid">
                <NavLink className="navbar-brand" style={{ color:"white" }} to={'/'}><i className="bi bi-fork-knife"></i> Indian-Bites </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" to={'/'}>All Foods</NavLink>
                    </li> 
                    {/* <li className="nav-item">
                        <NavLink className="nav-link active position-relative btn" aria-current="page" to={'/'}>Cart</NavLink>
                    </li> */}
                    <li className="nav-item">
                        <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" to={'/yourOrders'}>Your Orders</NavLink>
                    </li> 
                </ul>
                <div className='me-2'>
                   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        !isLogin && <>
                            <li className="nav-item">
                                <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" to={'/register'}>Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" to={'/login'}>Login</NavLink>
                            </li>
                          </>
                    }
                    {
                        isLogin && <>
                        <li className="nav-item">
                            <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" onClick={()=>
                                {
                                    setIsLogin(false)
                                    setUserId(null)
                                    navigateTo("/");
                                    }}>Logout
                            </NavLink>
                            
                        </li>
                        {/* <button type="button" className="btn btn-primary position-relative">
                            <i className="bi bi-cart3"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartQuantity}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button> */}
                        </>  
                    }      
                    </ul> 
                </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
