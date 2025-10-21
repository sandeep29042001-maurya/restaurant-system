import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext';

function AdminNavbar() {
    let navigateTo = useNavigate();
   let {isLogin,userId,setIsLogin,setUserId} =useContext(LoginContext);
    useEffect(()=>{
      console.log(isLogin);
      console.log(userId);
      
    },[])
  return (
  <div>
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#ff6600", color:"white" }} >
            <div className="container-fluid">
                <NavLink className="navbar-brand" style={{ color:"white" }} to={'/dashboard'}><i className="bi bi-fork-knife"></i> Indian-Bites </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" style={{ color:"white" }}  aria-current="page" to={'/dashboard/add-food'}>Add Foods</NavLink>
                    </li> 
                    <li className="nav-item">
                        <NavLink className="nav-link active" style={{ color:"white" }}  aria-current="page" to={'/dashboard/manage-categories'}>Manage Categories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" style={{ color:"white" }}  aria-current="page" to={'/dashboard/all-orders'}>User Orders</NavLink>
                    </li>

                </ul>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" onClick={()=> 
                              {
                              setIsLogin(false)
                              setUserId(null)
                              navigateTo("/")
                              }
                              }>Logout</NavLink>
                    </li>
                          
                  </ul> 
                </div>
                </div>
            </div>
        </nav>
  </div>
  )
}

export default AdminNavbar
