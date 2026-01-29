import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = ({user,setUser}) => {

  const navigate = useNavigate();
const handleLogout =()=>{
  localStorage.removeItem("token")
  setUser(null);
  navigate('/');
}

  return (
    <nav className='bg-gray-800 p-4 text-white '>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'className='text-white text-lg font-bold font-style- '>MERN AUTH</Link>
        <div>
          {user ?( <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Logout</button>):(
            <>
            <Link className='text-white mx-2 hover:underline' to='/register'>Register</Link>
            <Link className='text-white mx-2 hover:underline' to='/login'>Login</Link>
            </>
          )
          
          
         
        }
        </div>
      </div>
    </nav>
  )
}

export default Navbar