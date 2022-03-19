import React from "react";
import { useLocation } from 'react-router-dom';
import Nav from "../components/Nav";

function Details() {
    const {state} = useLocation();
   
    console.log(state)

  return (
    <div>
        <Nav/>
        <div className="lg:flex w-full sm:flex-col md:flex-row lg:flex-row mb-4 ">

        <div className="flex-auto w-24 ... mt-10 mx-auto">
           
           <img className="rounded-full mx-auto" src={state.image} width={220} height={180} alt="" />
           <div className="flex">
            {
                state?.online?(<>
               
                 <button className="bg-white m-auto mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                        Offers Video
                      </button>
                     
                </>):(<></>)
            }
             </div>

             <div className="flex">
            {
                state?.person?(<>
               
                 <button className="bg-white m-auto mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                        Offers in Person
                      </button>
                     
                </>):(<></>)
            }
             </div>
        </div>
        <div className="flex-auto w-64 ... mt-10 mx-auto">
            <h1 className="text-green-600 mt-10 font-light text-3xl">{state.name}</h1>
            <h1 className=" font-light text-xl">{state.title}</h1>
            <h1 className="text-green-600 mt-10 font-light text-3xl">Next Available Times</h1>
            <div className="flex border-b-2 border-gray-400 pb-8">
            
                     <button className="bg-white  mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                       April 22 1 pm
                      </button>
                      <button className="bg-white ml-1 mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                      April 22 2 pm
                      </button>
                      <button className="bg-white ml-1  mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                      April 22 4 pm
                      </button>
            </div>
            <h1 className="text-green-600 mt-10 ml-4 font-light text-3xl">Focus Area</h1>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 border-b-2 border-gray-400 pb-8">
            
            {
                state?.specialty?.map((e)=>(
                    <>
                     <button className="bg-gray-200  mr-4 ml-2 h-12 w-38 text-sm  mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold  px-4 rounded-3xl ">
                    {e}
                      </button>
                    </>
                ))
            }
                    
                     
            </div>

            <h1 className="text-green-600 mt-10 font-light text-3xl">What do you want clients to know about you?</h1>
            <div className="flex border-b-2 border-gray-400 pb-8">
            
                     <p className="font-light mt-4">{state.about}</p>
            </div>

            <h1 className="text-green-600 mt-10 font-light text-3xl">What can clients expect to take away from sessions with you?</h1>
            <div className="flex border-b-2 border-gray-400 pb-8">
            
                     <p className="font-light mt-4">{state.away}</p>
            </div>
        </div>


        <div className="  flex-auto w-14 ... mt-10 mx-auto">
        <h1 className="text-green-600 mt-10 font-light pr-4 text-3xl">Schedule Appointment</h1>
            <div className="flex border-b-2 border-gray-400 mr-10 pb-8">
            
            <button className="bg-green-600 mx-auto  mt-5 border-green-600 border-2 text-white  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                      Book Now
                      </button>
            </div>

            <h1 className="text-green-600 mt-10 font-light ml-4 pr-4 text-3xl">Accepted Insurance</h1>
            <div className="flex border-b-2 border-gray-400 mr-10 pb-8">
            
           {state?.insurance?.map((e)=>(
               <>
               <p className="ml-4 mt-8">{e}</p>
               </>
           ))}
            </div>

        </div>

        </div>
    </div>
  )
}

export default Details