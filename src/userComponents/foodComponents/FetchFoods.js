import React, { useContext, useEffect, useState } from 'react'
import FilterFood from './FilterFood';
import SearchFood from './SearchFood';
import { getAllFood, getCart } from '../../servicesApi/Api';
import SortFood from './SortFood';
import DisplayFood from './DisplayFood';
import { LoginContext } from '../../context/LoginContext';
import { NavLink, useNavigate } from 'react-router-dom';

function FetchFoods() {
    let [foodItems , setFoodItems] = useState();
    let[filteredFoods,setFilterdFoods] = useState();
    let [cartQuantity, setCartQuantity] = useState(0);
    let [isFoodAddToCart,SetIsFoodAddToCart] =useState(false);
    

    let {userId,isLogin} = useContext(LoginContext);

    const getAllFoods = async()=>{

        const res = await getAllFood();
        setFilterdFoods(res.data.data);
        setFoodItems(res.data.data);
    }

    const filterFoodByCategory = (categoryName)=>{

      if(categoryName === "all")
      {
        setFilterdFoods(foodItems);
      }
      else
      {
        let newFoodItems = [...foodItems];
        let filteredFoodItems = newFoodItems.filter((food)=>{
          return food.category.name === categoryName
        })
        setFilterdFoods(filteredFoodItems);
      }

    }

    const searchFoodByName = (foodName)=>{

    let newFoods = [...filteredFoods]
    
    let newFilteredFoods = newFoods.filter(food => 
            {
              return  food.name.toLowerCase().includes(foodName.trim().toLowerCase())
            })
    
    setFilterdFoods(newFilteredFoods)

    }

    const sortFoodByPrice = (sortBy)=>{

      let newFoodItems =[...filteredFoods]
      if(sortBy === "asc"){
        let newFilteredFoods = newFoodItems.sort((p1,p2) => p1.price-p2.price);
        setFilterdFoods(newFilteredFoods);
      }
      else
      {
        let newFilteredFoods = newFoodItems.sort((p1,p2) => p2.price-p1.price);
        setFilterdFoods(newFilteredFoods);
      }
    }

    const fetchCartItemsForPerticularUser = async(userId)=>
     {
      if(userId===null)
      {
          setCartQuantity(0)
      }
      else
      {
          const res = await getCart(userId)
          
          setCartQuantity(res.data.data?.length);
          SetIsFoodAddToCart(false);
          console.log(userId);
          
          
      }
  }


  useEffect(()=>{fetchCartItemsForPerticularUser(userId)},[userId,isFoodAddToCart])

    useEffect(()=>{
        getAllFoods();
    },[]);
  return (
    <div>
      <div className='d-flex p-3 justify-content-evenly'>
        <FilterFood onFilterFoodByCategory={filterFoodByCategory}/>
        <SearchFood onSearchFoodByName={searchFoodByName} />
        <SortFood onSortFoodByPrice ={sortFoodByPrice} />
        <button type="button" className="btn btn-primary position-relative">
            <NavLink className="nav-link active" style={{ color:"white" }} aria-current="page" to={'/cart'}><i className="bi bi-bag"></i></NavLink>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartQuantity}
                <span className="visually-hidden">unread messages</span>
              </span>
        </button>
      </div>
      <DisplayFood FoodsValue={filteredFoods} FooAddedToCart={SetIsFoodAddToCart} />
    </div>
  )
}

export default FetchFoods
