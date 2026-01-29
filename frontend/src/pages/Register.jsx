import React from 'react' 
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios'
import { Eye,EyeOff } from 'lucide-react';

const Register = ({setUser}) => {
  const [error,setError] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
     email:'',
    username:"",
    password:'',
  });
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }

const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const res = await axios.post("/api/users/register",formData);
    const userData ={
      id: res.data.user.id,
      username: res.data.user.username,
      email: res.data.user.email,
      token: res.data.user.token
    }
        localStorage.setItem("token",res.data.token);
        console.log(res.data);
        setUser(userData);
        navigate('/');
  }catch(err){
    setError(err.response?.data?.message || "Registration Failed");
  }
}

  return (
    <>
    <div className='min-h-screen flex items-center justify-center bg-gray-100  '>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Register</h2>
          {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label className='block text-gray-600 mb-2 text-sm font-medium'>Username</label>
              <input className=" w-full p-3 border border-gray-300 rounded-md focus:ring-blue-200
              focus:ring-2 outline-none focus:border-blue-400"
               type='username' 
               name="username"
               value={formData.username}
               onChange={handleChange}
                placeholder="Enter your username"
                required
             />
             </div>


            <div>
              <label className='block text-gray-600 mb-2 text-sm font-medium'>Email</label>
              <input className=" w-full p-3 border border-gray-300 rounded-md focus:ring-blue-200
              focus:ring-2 outline-none focus:border-blue-400"
               type='email' 
               name="email"
               value={formData.email}
               onChange={handleChange}
                placeholder="Enter your email"
                autoComplete='off'
                required
             />
             </div>
             

              <div className='mb-6'>
              <label className='block text-gray-600 mb-2 text-sm font-medium'>Password</label>
              <div className='relative'>
              <input className=" w-full p-3 border border-gray-300 rounded-md focus:ring-blue-200
              focus:ring-2 outline-none focus:border-blue-400 pr-10"
               type= {showPassword ? "text" :"password"}
               
               name='password' 
               value={formData.password}
               onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="off"
                required
             />
             <button className='absolute right-3 -translate-y-1/2 top-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                onClick ={()=>setShowPassword(!showPassword)}
                type='button'>
                   {showPassword ? (<EyeOff size={18}/> ):(<Eye size={18}/>)}
              </button>
              </div>
            </div>

            <button className='w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium cursor-pointer'>Register</button>
          </form>
        </div>
    </div>
    </>
  )
}

export default Register