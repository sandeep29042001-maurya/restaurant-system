import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/LoginContext';
import { deleteCart, getCart, placeOrder, updateCart } from '../servicesApi/Api';
import { useNavigate } from 'react-router-dom';

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const { userId,isLogin } = useContext(LoginContext);
  const navigateTo = useNavigate();

  useEffect(() => {
  
    if(userId){
    fetchCart();
    }
    
  }, [isLogin]);

  const fetchCart = async () => {

    try {
    
      const res = await getCart(userId);
      let fetchItem = res.data.data;
      if(fetchItem === null)
      {
        setCartItems([]);
      }
      else
      {
        setCartItems(fetchItem);
      }
      // if(res.data.data === null)
      // {
      //   alert("Cart is Empty Add Food")
      // }
      // else
      // {
      //   setCartItems([]);
      // }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleQuantityChange = async (cartId, quantity) => {
    try {
      await updateCart(cartId, quantity);
      fetchCart(); // refresh UI
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await deleteCart(cartId);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handlePlaceOrder = async(userId)=>{
    
    try
    {

      if(userId === null)
      {
        alert("Add Food To Cart")
      }
      else
      {
      const res = await placeOrder(userId);
      if(res.data.data !== null)
      {
        alert(res.data.message);
        navigateTo("/yourOrders")
      }
      else
      {
        alert(res.data.message);
      }
    }
   }
   catch(error)
    {
      console.error("Error in placing Order", error);
      
    }
     
    
  }


  return (
    

    <div>
      <div className="d-flex justify-content-center mt-3">                                                                                                               
        <h1 className='text-center rounded 'style={{padding:"5px", backgroundColor: "#ff6600", color:"white" }} >My Cart Foods</h1>
      </div>
      
      <div className='mt-3 d-flex justify-content-center'> 
                <table className="table w-75 table-hover table-bordered text-center ">
                  <thead>
                  <tr>
                      <th scope='col'>foodItem</th>
                      <th scope='col'>PRICE</th>
                      <th scope='col'>QTY</th>
                      <th scope='col'>TOTAL PRICE</th>

                      <th colSpan={2} scope='col'>UpdateQTY</th>
                      <th scope='1'>DELETE</th>
                    </tr>  
                  </thead>
                  <tbody className='table-group-divider'>
                     {
                      cartItems && cartItems.map(cartItem =>{
                        return <tr key={cartItem.id}>
                                <td>{cartItem.foodItems.name}</td>
                                <td>{cartItem.foodItems.price}</td>
                                <td>{cartItem.quantity}</td>
                                <td>{cartItem.foodItems.price * cartItem.quantity}</td>
                              
                                <td><button className='btn btn-danger' disabled={cartItem.quantity < 1} onClick={()=>handleQuantityChange(cartItem.id,cartItem.quantity - 1)}>-</button></td>
                                <td><button className='btn btn-success' onClick={()=>handleQuantityChange(cartItem.id,cartItem.quantity + 1)} >+</button></td>

                                <td><button className='btn btn-danger' onClick={()=>handleRemove(cartItem.id)}>Delete</button> </td>
                              </tr>
                      })
                     }
                  </tbody>
                </table>
            </div>
              <div className='d-flex justify-content-center'><button className='btn btn-primary' onClick={()=>{handlePlaceOrder(userId)}}>Place Order</button> </div>
    </div>
    
  )
}

export default Cart
