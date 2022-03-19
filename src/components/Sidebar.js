import React,{useEffect,useState} from 'react'



function Sidebar() {
   
   

    const logout = ()=>{
        
    }
    return (
        <div className="max-w-full h-full bg-yellow-700 text-white font-medium">
           

            <div>
                <ul className="mx-20 lg:mx-10">
                    
                    <div className="mt-10">
                    <li className="text-base  ml-2 hover:text-blood hover:cursor-pointer">Home</li>
                    </div>
                    <div className="mt-10">
                    <li className="text-base  ml-2 hover:text-blood hover:cursor-pointer">Find Clients</li>
                    </div>

                    <div className="mt-10">
                    <li className="text-base  ml-2 hover:text-blood hover:cursor-pointer">Logout</li>
                    </div>
                    
                </ul>
            </div>

           
           
        </div>
    )
}

export default Sidebar