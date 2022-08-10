import React from 'react'
import { useNavigate } from 'react-router-dom';

function Nav2() {
  const navigate = useNavigate();
  return (
    <div className='bg-secondary h-16 flex'>
       <button  onClick={()=>{navigate("/")}}  class="text-lg mr-auto ml-5 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:hover:font-cursive md:p-0 dark:text-white" aria-current="page">Back</button>
     
    </div>
  )
}

export default Nav2