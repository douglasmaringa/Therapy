import React,{useState,useEffect} from 'react'
import firebase from 'firebase';
import {db} from "../base"
import { useNavigate } from 'react-router-dom';

function ChatUi({details,messages,user,id,client,other,verified,chatroom}) {
    
    const[message,setMessage]=useState("")
    const navigate = useNavigate();

    useEffect(()=>{
      let mounted = true
      if (mounted) {
         if(chatroom.to === user.email){
           
            db.collection('chatroom').doc(id).update({
              "new":false,
              })
              
             
           }
          }
           return function cleanup() {
            mounted = false
            console.log("component unmounted")
        }
    },[chatroom])
  
   
    console.log(chatroom.to)
    //messages are not unique so we will add id feild to make them unique
    const chat = ()=>{
          
        //sending a message to the chat room 
        db.collection('chatroom').doc(id).update({
        messages: firebase.firestore.FieldValue.arrayUnion({"message":message,"sender":user.email,"time":""}),
        lastmessage:message,
        to:other,
        new:true
      })
      //alert("sent")
      setMessage("")
   }

   const open=()=>{
      navigate('/clientdetails', { state: details[0]});
    }

    console.log(details)
    
  return (
   
    <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen font-Rampart">
       <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div class="relative flex items-center space-x-4">
             
             
             <div class="flex flex-col leading-tight">
                <div class="text-2xl mt-1 flex items-center">
                   <span onClick={open} class="text-gray-700 mr-3 cursor-pointer">{other}</span>
                </div>
               
             </div>

             <div class="relative">
                {
                   verified?(<></>):(<>
                   {
                      client?(<>
                      <p class="text-red-700 mt-2">You are not verified</p>
                   
                      </>):(<></>)
                   }
                   </>)
                }
             </div>
          </div>
          <div class="flex items-center space-x-2">
             <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
             </button>
             <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
             </button>
             <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
             </button>
          </div>
       </div>

       

       {
           messages?.map((e)=>(
            <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {(() => {
        switch (e.sender) {
          case user.email:   return (<>
         <div class="chat-message">
               <div class="flex items-end justify-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                     <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{e.message}</span></div>
                  </div>
                
               </div>
            </div>
          
          </>);
         
          default:      return (<>
          
          <div class="chat-message">
               <div class="flex items-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                     <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{e.message}</span></div>
                  </div>
                
               </div>
            </div>
            </>);
        }
      })()}
            
           </div>
           ))
       }
       


       <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div class="relative flex">
            
             <input value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
             <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
               
                <button onClick={chat} type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                   <span class="font-bold">Send</span>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                   </svg>
                </button>
             </div>
          </div>
       </div>
    </div>
    
   
    
   
  )
}

export default ChatUi