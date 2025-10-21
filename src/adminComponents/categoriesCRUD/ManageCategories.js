import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addCategory, deletCategoriesById, getCategories } from '../../servicesApi/Api';
import { NavLink } from 'react-router-dom';


function ManageCategories() {
  const{register,handleSubmit,formState,reset} = useForm();

  let [categories, setCategories]=useState(null)
  let [isNewcategoryAdded, setIsNewcategoryAdded]=useState(false)
  let [isDeleted, setIsDeleted] = useState(false);

  const collectFormData = async (FormData)=>{

    console.log(FormData);
    let res = await addCategory(FormData);
    
    if(res.data.data === true){
      alert("category already exist");
    }
    else{
      setIsNewcategoryAdded(!isNewcategoryAdded);
      alert("category added");
    }
    
    // clear inputs after success
    reset();

  }

   //  Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deletCategoriesById(id);
        alert("Category deleted");
        setIsDeleted(!isDeleted); // trigger re-fetch
      } catch (error) {
        alert("Error deleting category");
        console.error(error);
      }
    }
  };

    const fetchAllCategories = async() =>
  {
    console.log("isNewcategoryAdded" , isNewcategoryAdded)
    let response=await getCategories();
    setCategories(response.data.data);
    console.log(categories);   
  }
  
   useEffect(()=>{fetchAllCategories()}, [isNewcategoryAdded,isDeleted]);
  return (
    <div>
      <h1 className='text-center mb-3'>Manage Categories</h1>
      <div className='d-flex justify-content-center'>
        <form className='w-25' onSubmit={handleSubmit(collectFormData)}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder='Category Name' 
              {...register("name", {required:true, minLength:5, maxLength:100})}/>
              <div className="form-text text-danger">
                    {formState.errors.name?.type === "required" && 'category Name is required'}
                    {formState.errors.name?.type === "minLength" && 'category Name must have min 5 characters'}
                    {formState.errors.name?.type === "maxLength" && 'category Name should not exceed 10 characters'}       
              </div>

              <input type="text" className="form-control" placeholder='Category Description' 
              {...register("description", {required:true, minLength:1, maxLength:1000})}/>
              <div className="form-text text-danger">
                    {formState.errors.address?.type === "required" && 'description is required'}
                    {formState.errors.address?.type === "minLength" && 'description must have min 1 characters'}
                    {formState.errors.address?.type === "maxLength" && 'description should not exceed 1000 characters'}       
              </div>

            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
      <div className='mt-3 d-flex justify-content-center'> 
          <table className="table w-50 table-hover table-bordered text-center ">
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>CATEGORY NAME</th>
                <th scope='col'>DESCRIPTION</th>
                <th scope='col'>DELETE</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {
                categories && categories.map(category => {
                  return <tr key={category.id}>
                <th>{category.id}</th>
                <td>{category.name}</td>
                <td>{category.description} </td>
                 <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
              </tr>
                })
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default ManageCategories
