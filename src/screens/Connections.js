import React, { useEffect,useState } from "react";
import {db} from '../base'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import Nav from '../components/Nav'

function Connections() {
    const navigate = useNavigate();
 const { user } = useSelector(state => state.user)
 const[data,setData]=useState([])

 useEffect(() => {
    
        db.collection("chatroom").where("members", "array-contains", user.email)
        .onSnapshot((querySnapshot) => {
           
          setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
    })
   
  }, [user]);

  //when you click the conversation it will open that conversation in chat page
  const chat=(e)=>{
    navigate('/chat', { state: e});
}

 console.log(data)
 
  return (
    <div className="font-Rampart">
        <Nav/>
        {
            data.map((e)=>(
    
       <div  class="mt-5 mx-10 md:mx-40 flex ... bg-gray-300 py-4 rounded-md">
        <div className="m-auto flex">
         <img class="w-10 h-10 rounded-full mr-4" src="https://images.squarespace-cdn.com/content/v1/61d75d93d08895301e56f1cb/e4cd2bbe-ee94-4d77-b7e3-852f3de3a283/AND-STILL-WE-RISE-SIDE-sm.png?format=1000w" alt="Avatar of Writer"/>
         <div class="shrink w-64">
           <p class="text-secondary mt-4  leading-none pr-4 md:pr-20">{e?.members.filter((f)=> f != user.email)}</p>
           <p class="text-primary mt-4 leading-none pr-4 md:pr-20">{e?.lastmessage}</p>
         </div>

         </div>
        
         <div className="shrink w-64">
         <button onClick={()=>{chat(e)}} className="bg-white ml-auto justify-end align-middle h-10 mt-2 border-secondary border-2 text-black  hover:bg-secondary hover:text-white font-bold px-4 rounded-full ">
                                  Chat
            </button>
         </div>

       </div>
  
            ))
        }
        
        
        </div>
  )
}

export default Connections