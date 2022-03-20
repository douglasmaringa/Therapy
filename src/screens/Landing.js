import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Register.css"

function Landing() {
    const navigate = useNavigate();
  return (
    <div>
        <div class='grid grid-cols-12'>
        <div class="col-span-4 text-white font-sans font-bold bg-gray-300 min-h-screen pl-7">
            <div class="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
                <div class="row-span-4 text-center row-start-2 text-4xl">
                                
                    
                  
                    <div class="text-sm font-sans font-medium w-full pr-20 ">
                    <h1 class="font-bold text-black text-lg pb-10">Welcome</h1>
                        <button 
                            type="button"  
                            onClick={()=>{navigate("/login")}} 
                            class="text-center m-auto font-bold w-80 py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white">
                                SIGN IN
                        </button>
                    </div>
                </div>
               
                
            </div>         
        </div>

       
        <div class="banner col-span-8 text-white font-sans font-bold">
           
        </div>    
</div>

    </div>
  )
}

export default Landing