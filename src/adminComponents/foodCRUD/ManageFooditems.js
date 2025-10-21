import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { deleteFood, getAllFood } from '../../servicesApi/Api';
import { NavLink } from 'react-router-dom';

function ManageFooditems() {

  let{isLogin} = useContext(LoginContext);
  const [foodItems,setFoodItems] = useState([]);
  const [isFoodDeleted, setIsFoodDeleted] =useState(false);

  const fetchAllFooditems =async()=>{

    setIsFoodDeleted(false);
    const res = await getAllFood();
    // console.log(res.data.data);
    setFoodItems(res.data.data);
  }

  const handleDeleteFoodItem = async (foodId)=>{

    const res = await deleteFood(foodId);
    if(res.data.data === null)
    {
      setIsFoodDeleted(true);
    }
  }

  useEffect(()=>{fetchAllFooditems()},[isLogin,isFoodDeleted])

  return (
    <div>
      <h1 className='text-center text-primary'>Manage Your Foods</h1>
      <div className='mt-3 d-flex justify-content-center'> 
                <table className="table w-75 table-hover table-bordered text-center ">
                  <thead>
                  <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>IMAGE</th>
                      <th scope='col'>NAME</th>
                      <th scope='col'>PRICE</th>
                      <th scope='col'>DESCRIPTION</th>
                      <th scope='col'>CATEGORY</th>
                      <th colSpan={2} scope='col'>ACTION</th>
                    </tr>  
                  </thead>
                  <tbody className='table-group-divider'>
                     {
                      foodItems && foodItems.map(foodItem =>{
                        return <tr key={foodItem.id}>
                                <td>{foodItem.id}</td>
                                <td>{foodItem.imageUrl}</td>
                                <td>{foodItem.name}</td>
                                <td>{foodItem.price}</td>
                                <td>{foodItem.description}</td>
                                <td>{foodItem.category.name}</td>
                                <td><NavLink className='btn btn-warning' to={`/dashboard/update-food/${foodItem.id}`}>Update</NavLink></td>
                                <td><button className='btn btn-danger' onClick={()=>{handleDeleteFoodItem(foodItem.id)}} >Delete</button></td>
                              </tr>
                      })
                     }
                  </tbody>
                </table>
            </div>
    </div>
  )
}

export default ManageFooditems
