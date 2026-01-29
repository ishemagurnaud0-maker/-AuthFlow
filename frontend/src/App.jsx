import React from 'react'
import { useState,useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import NotFound from './components/NotFound'


const App = () => {
  const [user,setUser] = useState(null);
  const [error,setError] = useState('');
  const [isLoading,setIsLoading] = useState(true)
  console.log(user);
  useEffect(()=>{
    const fetchUser = async()=>{
      const token = localStorage.getItem('token');
      if(token){
        try{
          const res = await axios.get('/api/user/me',{
            headers:{Authorization:`Bearer ${token}`}
            
          })
          setUser(res.data);

        }catch(err){
          console.log("Token not Found", err)
          setError("Failed to fetch user data")
          localStorage.removeItem("token");
        };
      }
      setIsLoading(false);
    }
    fetchUser();
  },[]);

if(isLoading) {
  return(
    <div className='min-h-screen bg-gray-900 items-center justify-center flex'>
     <div className='text-xl text-white'>Loading...</div> 
    </div>
  )
}


  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home user={user} error={error}/>} />
        <Route path='/register' element={user ? <Navigate to='/'/> : <Register setUser={setUser}/>} />
        <Route path='/login' element={ user ? <Navigate to='/'/> : <Login setUser={setUser} />} />
        <Route path ='*' element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App