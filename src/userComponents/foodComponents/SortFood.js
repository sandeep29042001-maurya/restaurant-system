import React from 'react'

function SortFood(props) {

  const handleChange = (e)=>{
    props.onSortFoodByPrice(e.target.value);
  }
  return (
    <div>
      <select className="form-select" onChange={handleChange}>
            <option selected disabled>Sort Product By Price</option>
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
    </div>
  )
}

export default SortFood
