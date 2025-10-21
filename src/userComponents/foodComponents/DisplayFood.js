import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import { addToCart } from '../../servicesApi/Api';

function DisplayFood(props) {

    let foods = props.FoodsValue
    let {userId,isLogin} = useContext(LoginContext);

    const navigateTo = useNavigate();

    // let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi tempore rerum repellendus unde facere velit itaque rem, est aut odio non autem sit veritatis aperiam alias a tempora deserunt quas. Necessitatibus optio quasi consequuntur pariatur amet neque ea, incidunt, voluptatem totam doloremque dignissimos facilis harum. Adipisci, itaque exercitationem? Eius, molestias?"
    const addtoCart= async (foodId)=>{

    if(isLogin)
    {
      let data ={
        "user":{"id":userId},
        "foodItems":{"id":foodId},
        "quantity":1
      }

      console.log(data);
      

      const res = await addToCart(data);
      
      if(res.data.data === false)
      {
        alert(res.data.message) //if food is already in cart
        
      }
      else if(res.data.data === true)
      {
        alert(res.data.message); //food item added to cart
        props.FooAddedToCart(true)
      }
      else
      {
        alert(res.data.message) // login to add food
      }
    }
    else
    {
      alert("Login To Add Food");
    }

      console.log("Food Added To Cart" );
      console.log(isLogin);
      console.log(userId);
         
    }

  return (
    <div className='container'>
      <div className='row gy-3'>
        {
          foods && foods.map(food =>{
            return (
              <div className='col-3' key={food.id}>
                  <div className="card" style={{width:16+"rem"}}>
                      <img src="/FoodImage.jpg" className="card-img-top w-75 mx-auto d-block" alt="..."/>
                      <div className="card-body">
                        <h5 className="card-title text-capitalize text-center">{food.name}</h5>
                        <p className="card-text mb-0">{food.description}...</p>
                        <div className='d-flex justify-content-between'>
                          <p className="card-text">&#8377;{food.price}</p>
                          <p className="card-text mark mb-3">{food.category.name}</p>                     
                        </div>
                        <div className='d-flex justify-content-between'>
                          <NavLink  className="btn btn-primary">View More</NavLink>
                          <button  className="btn btn-warning" onClick={()=>{addtoCart(food.id)}}>Add to cart </button>
                        </div>
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DisplayFood
