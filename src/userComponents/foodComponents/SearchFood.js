import React from 'react'
import { useForm } from 'react-hook-form'

function SearchFood(props) {

  let{register,handleSubmit,formState} = useForm();

  const collectFormData = (data)=>{

    props.onSearchFoodByName(data.name);
  }

  return (
    <div>
      <form  className="d-flex align-items-start gap-2" onSubmit={handleSubmit(collectFormData)}>
          <div className='d-flex flex-column'>
            <input type="text" className="form-control" placeholder='Food Name' 
            {...register("name", {required:true, minLength:3, maxLength:20})}/>
            <div className="form-text text-danger">
                  {formState.errors.name?.type === "minLength" && 'Food Name must have min 3 characters'}
                  {formState.errors.name?.type === "maxLength" && 'Food Name should not exceed 20 characters'}       
            </div>
          </div>
        <button type="submit" className="btn btn-primary">Search</button>
        </form>
    </div>
  )
}

export default SearchFood
