import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../servicesApi/Api';


function Register() {
     const {register, handleSubmit, watch, formState}=useForm();
     const navigate = useNavigate();
     
     const handleRegister =async (FormData)=>{
        const { fullAddress, pincode, password2,role, ...rest } = FormData;

        const actualData = {...rest,role, address: {fullAddress,pincode}};
        console.log(FormData);
        try{
        const res = await registerUser(actualData);
        alert("User registered successfully!");
        console.log(res.data);
        navigate("/login")
        }catch(err){
            console.error();
            alert("Registration failed!");
        }

     }

  return (
    <div className='d-flex justify-content-center'>
     
      <form className='w-25' onSubmit={handleSubmit(handleRegister)}>
        <h1 className='text-center mb-3'>Register</h1>
        {/* name  */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Your Name' 
          {...register("name", {required:true, minLength:3, maxLength:10})}/>
          <div className="form-text text-danger">
                {formState.errors.name?.type === "required" && 'Name is required'}
                {formState.errors.name?.type === "minLength" && 'Name must have min 3 characters'}
                {formState.errors.name?.type === "maxLength" && 'Name should not exceed 10 characters'}       
          </div>
        </div>
        
        {/* email  */}
        <div className="mb-3">
          <input type="email" className="form-control" placeholder='Your Email' 
          {...register("email", {required:true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/})}/>
          <div className="form-text text-danger">
                {formState.errors.email?.type === "required" && 'Email is required'}
                {formState.errors.email?.type === "pattern" && 'Enter valid email'}
          </div>
        </div>

        {/* password  */}
        <div className="mb-3">
          <input type="password" className="form-control" placeholder='Your Password' 
          {...register("password", {required:true, minLength:3, maxLength:10})}/>
          <div className="form-text text-danger">
                {formState.errors.password?.type === "required" && 'Password is required'}
                {formState.errors.password?.type === "minLength" && 'Password must have min 3 characters'}
                {formState.errors.password?.type === "maxLength" && 'Password should not exceed 10 characters'}       
          </div>
        </div>

        {/* confirm password  */}
        <div className="mb-3">
          <input type="password" className="form-control" placeholder='Confirm Password' 
          {...register("password2", {required:true, minLength:3, maxLength:10,  validate: (value) => value === watch("password") || "Passwords do not match"})}/>
          <div className="form-text text-danger">
                {formState.errors.password2?.type === "required" && 'Confirm Password is required'}
                {formState.errors.password2?.type === "minLength" && 'Confirm Password must have min 3 characters'}
                {formState.errors.password2?.type === "maxLength" && 'Confirm Password should not exceed 10 characters'}      
                {formState.errors.password2?.type === "validate" && formState.errors.password2.message} 
          </div>
        </div>

        {/* full address  */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Your Address' 
          {...register("fullAddress", {required:true, minLength:5, maxLength:100})}/>
          <div className="form-text text-danger">
                {formState.errors.fullAddress?.type === "required" && 'Address is required'}
                {formState.errors.fullAddress?.type === "minLength" && 'Adress must have min 5 characters'}
                {formState.errors.fullAddress?.type === "maxLength" && 'Address should not exceed 100 characters'}       
          </div>
        </div>

        {/* pincode  */}
        <div className="mb-3">
          <input type="number" className="form-control" placeholder='Your Pincode' 
          {...register("pincode", {required:true, minLength:6, maxLength:6})}/>
          <div className="form-text text-danger">
                {formState.errors.pincode?.type === "required" && 'Pincode is required'}
                {formState.errors.pincode?.type === "minLength" && 'Pincode must have exactly 6 digits'}
                {formState.errors.pincode?.type === "maxLength" && 'Pincode must have exactly 6 digits'}       
          </div>
        </div>

        {/* usertype  */}
        <div className="mb-3">
          <select className="form-select" {...register("role")}>
            <option value="user">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  )
}

export default Register
