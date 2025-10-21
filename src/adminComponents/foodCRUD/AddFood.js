import React, { useEffect, useState } from 'react'
import { addFood, getCategories } from '../../servicesApi/Api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AddFood() {

  const {register,handleSubmit,formState} = useForm();
  const [categories,setCategories] = useState([]);
  let navigateTo = useNavigate();

  const collectFormData = async(FormData)=>{

    const actualFoodData = {
      name:FormData.name,
      price:FormData.price,
      description:FormData.description,
      imageUrl:FormData.imageUrl,
      category: {name:FormData.categoryName}};

      const res = await addFood(actualFoodData);
        alert(res.data.message);
        navigateTo("/dashboard");
      
     
    console.log(actualFoodData);
  }

  const getAllCategories = async ()=>{

    try
    {
    const res = await getCategories();
    setCategories(res.data.data);
    }
    catch(err)
    {
      console.error("Error in getting categories",err);
      
    }
  }

  useEffect(()=>{
    getAllCategories();
  },[]);

  return (
    <div className='d-flex justify-content-center'>
      <form className='w-25' onSubmit={handleSubmit(collectFormData)} encType="multipart/form-data">
        <h1 className='text-center mb-3'>Register</h1>
        {/* name  */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Food Name' 
          {...register("name", {required:true, minLength:3, maxLength:25})}/>
          <div className="form-text text-danger">
                {formState.errors.name?.type === "required" && 'Product Name is required'}
                {formState.errors.name?.type === "minLength" && 'Product Name must have min 3 characters'}
                {formState.errors.name?.type === "maxLength" && 'Product Name should not exceed 25 characters'}       
          </div>
        </div>
        
        {/* price  */}
        <div className="mb-3">
          <input type="number" className="form-control" placeholder='Food Price' 
          {...register("price", {required:true,min:10, max:10000})}/>
          <div className="form-text text-danger">
                {formState.errors.price?.type === "required" && 'Food Price is required'}
                {formState.errors.price?.type === "min" && 'Min Food price should be 10'}
                 {formState.errors.price?.type === "max" && 'Min Food price should be 10000'}
          </div>
        </div>

        {/* Description  */}
        <div className="mb-3">
          <input type="text" className="form-control"  placeholder='description'
          {...register("description", {required:true, minLength:3, maxLength:1000})}/>
          <div className="form-text text-danger">
                {formState.errors.description?.type === "required" && 'food description required'}
                {formState.errors.description?.type === "minLength" && 'description length must have min 3 characters'}
                {formState.errors.description?.type === "maxLength" && 'description length should not more than 1000'} 
          </div>
        </div>

        {/* categories  */}
        <div className="mb-3">
          <select className="form-select" {...register("categoryName", {required:true})}>
            <option value="">Click to select Category</option>
            {
              categories && categories.map(category =>{
                return <option value={category.name} key={category.id}>{category.name}</option>
              })
            } 
          </select>
          <div className="form-text text-danger">
                {formState.errors.categoryName?.type === "required" && 'Food Category is required'}
          </div>
        </div>

        {/* file */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Food Image' 
          {...register("imageUrl", {required:true})}/>
          <div className="form-text text-danger">
                {formState.errors.imageUrl?.type === "required" && 'Food Image is required'} 
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  )
}

export default AddFood
