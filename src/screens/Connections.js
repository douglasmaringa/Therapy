import React, { useEffect,useState } from "react";
import {db,auth} from '../base'
import firebase from "firebase";
import { firestore } from 'firebase'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import Nav from '../components/Nav'

function Connections() {
    const navigate = useNavigate();
 const dispatch = useDispatch()
 const { user } = useSelector(state => state.user)
 const[data,setData]=useState([])
 const[clientdata,setClientdata]=useState([])
 const[client,setClient]=useState(false)

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
    <div>
        <Nav/>
        {
            data.map((e)=>(
                <>
                <div class="p-10 lg:mx-20 font-serif">
   
   <div class=" w-full lg:max-w-full lg:flex">
    
     <div class="border-r ml-40 border-b border-l border-gray-400 lg:border-l-2 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      
       <div class="flex items-center">
         <img class="w-10 h-10 rounded-full mr-4" src="https://images.squarespace-cdn.com/content/v1/61d75d93d08895301e56f1cb/e4cd2bbe-ee94-4d77-b7e3-852f3de3a283/AND-STILL-WE-RISE-SIDE-sm.png?format=1000w" alt="Avatar of Writer"/>
         <div class="text-sm flex">
           <p class="text-green-600 mt-4  leading-none pr-20">{e?.members[0]} and <span className="text-blue-800">{e?.members[1]}</span></p>
           <button onClick={()=>{chat(e)}} className="bg-white mx-2  mt-2 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-1 px-4 rounded-3xl ">
                                  Chat
            </button>
         </div>
       </div>
     </div>
   </div>
 </div>

                </>
            ))
        }
        
        
        </div>
  )
}

export default Connections