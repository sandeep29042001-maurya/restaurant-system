import React, { useEffect, useState } from 'react'
import { getCategories } from '../../servicesApi/Api';

function FilterFood(props) {
  let [categories,setCategories] = useState();
  
  const getAllCategories = async()=>{
    
    const res = await getCategories();
    setCategories(res.data.data);

  }

  const handleChange = (e)=>{

    props.onFilterFoodByCategory(e.target.value);
  }

  useEffect(()=>{
    getAllCategories();
  },[]);
  return (
    <div>
      <select className="form-select" onChange={handleChange}>
            <option selected disabled>Click to select Category</option>
            <option value="all">All</option>
            {
              categories && categories.map(category =>{
                return <option value={category.name} key={category.id}>{category.name}</option>
              })
            } 
          </select>
    </div>
  )
}

export default FilterFood
