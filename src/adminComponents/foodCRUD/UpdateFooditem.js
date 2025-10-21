import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { getCategories, getFoodById, updateFood } from '../../servicesApi/Api';

function UpdateFooditem() {

  const[food,setFood]=useState({});
  const{register,handleSubmit,formState,reset} =useForm();
  let{userId} = useContext(LoginContext);
  let[categories,setCategories]= useState([]);
  let urlParameters=useParams()
  let navigate =useNavigate();

  const getfoodById = async ()=>{
    
    const res = await getFoodById(urlParameters.foodId);
    const fooData =res.data.data
    setFood(res.data.data);
    getAllCategories();
    reset(fooData);
    
  }

  const collectFormData = async (FormData)=>{

    const actualFoodData = {
      name:FormData.name,
      price:FormData.price,
      description:FormData.description,
      imageUrl:FormData.imageUrl,
      category: {name:FormData.categoryName}};

    const res = await updateFood(urlParameters.foodId,actualFoodData);
    console.log(res.data);
    

    if(res.data.data !== null)
    {
      alert(res.data.message);
      navigate("/dashboard");
    }
    else
    {
      alert("Food Item not exsist");
    }
    
  }

  const getAllCategories =async ()=>{

    const res = await getCategories();
    setCategories(res.data.data)
    
  }

  useEffect(()=>{
    getfoodById();
  },[])

  return (
    <div className='d-flex justify-content-center'>
      {
        food && <form className='w-25' onSubmit={handleSubmit(collectFormData)} encType="multipart/form-data">
        <h1 className='text-center mb-3'>Update Food-Items</h1>
        {/* name  */}
        <div className="mb-3">
          <input type="text" className="form-control" 
          {...register("name", {required:true, minLength:3, maxLength:100})}/>
          <div className="form-text text-danger">
                {formState.errors.name?.type === "required" && 'Food Name is required'}
                {formState.errors.name?.type === "minLength" && 'Food Name must have min 3 characters'}
                {formState.errors.name?.type === "maxLength" && 'Food Name should not exceed 100 characters'}       
          </div>
        </div>
        
        {/* price  */}
        <div className="mb-3">
          <input type="number" className="form-control"  
          {...register("price", {required:true,min:10, max:10000})}/>
          <div className="form-text text-danger">
                {formState.errors.price?.type === "required" && 'Food Price is required'}
                {formState.errors.price?.type === "min" && 'Min Food price should be 10'}
                 {formState.errors.price?.type === "max" && 'Max Food price should be 10000'}
          </div>
        </div>

        {/* Description  */}
        <div className="mb-3">
          <input type="text" className="form-control"  
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
                {formState.errors.categoryName?.type === "required" && 'FoodItem Category is required'}
          </div>
        </div>

        {/* file */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='food Image' 
          {...register("imageUrl", {required:true, minLength:3, maxLength:10})}/>
          <div className="form-text text-danger">
                {formState.errors.imageUrl?.type === "required" && 'FoodItem Image is required'}
                {formState.errors.imageUrl?.type === "minLength" && 'FoodItem length must have min 3 characters'}
                {formState.errors.imageUrl?.type === "maxLength" && 'FoodItem length should not more than 10'} 
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
      }
    </div>
  )
}

export default UpdateFooditem
