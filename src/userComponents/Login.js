import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../servicesApi/Api';

function Login() {

    const {register, handleSubmit, formState}=useForm();
    let {setIsLogin,setUserId} =  useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogin =async (FormData)=>{

        try{
             const response = await loginUser(FormData);
             localStorage.setItem("user", JSON.stringify(response.data.data));

             alert("Login successful!");
            //  console.log(response.data.data.role);
              setIsLogin(true);
              setUserId(response.data.data.id);

               if(response.data.data.role === "Admin")
                {
                    navigate("/dashboard")
                }
                else{
                   navigate("/")
                }
            
        }
        catch(err){
            console.error();
            alert("Invalid credentials!");
        }
    }
  return (
    <div className='d-flex justify-content-center'>
      <form className='w-25' onSubmit={handleSubmit(handleLogin)}>
        <h1 className='text-center mb-3'>Login</h1>

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

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  )
}

export default Login
