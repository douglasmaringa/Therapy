import React, { useEffect,useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";
import {db} from '../base'
import dateFormat from 'dateformat';
import firebase from "firebase";
import {useDispatch, useSelector} from 'react-redux'
import {createChat} from "../slices/Chat"

function Details() {
    const {state} = useLocation();
    const[data,setData]=useState([])
    const[userID,setUserID]=useState([])
    const { user } = useSelector(state => state.user)
    const { chatroom } = useSelector(state => state.chatroom)
  const dispatch = useDispatch()
  const navigate = useNavigate();

    useEffect(() => {

      if(user){
       
        db.collection("clients").where("email", "==", user.email)
        .onSnapshot((querySnapshot) => {
           
          setUserID(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
          
    })
        //get all users
        db.collection("users").onSnapshot((querySnapshot) => {
           //get users and then filter out those that are not your friends
          //setData(querySnapshot.docs.map((doc)=>doc.data()))
          const jeepAutos = querySnapshot.docs.map((doc)=>doc.data()).filter((auto) => !auto.friends.includes(user.email))
          //setData(jeepAutos)

          
    })
       
     
    }else{
        console.log("not logged in")
        
    }
       
      //using chatroom id we get from conversation page we then look for that chat room using the chatID feild we added in users and said was not neccessary
      db.collection("timeslots").where("email", "==", state.email)
      .onSnapshot((querySnapshot) => {
         
        setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
         
  })

   
}, [state,user])
    //console.log(state,data)

   //book appointment
   const reserve = (e)=>{
    console.log(e)
    //add booking to the therapist time slot object
    db.collection('timeslots').doc(data[0]?.id).update({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
       bookings:firebase.firestore.FieldValue.arrayUnion({"slot":e.slot,"email":"logged in user email"})
       })
    //deletes the current time slot
    db.collection('timeslots').doc(data[0]?.id).update({
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
     dateTime:firebase.firestore.FieldValue.arrayRemove(e)
     })
     //readds it as booked
     db.collection('timeslots').doc(data[0]?.id).update({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
       dateTime:firebase.firestore.FieldValue.arrayUnion({"slot":e.slot,"Booked":true})
       })
    alert("reserved")
  }

  const chat =()=>{
    
    if(userID){
       dispatch(createChat({user,userID,state}))
       
    }else{
      alert("cannot talk to other therapists")
    }
    
       
  }
  
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
            <div className="flex flex-row border-b-2 border-gray-400 pb-8">
            <div className="flex overflow-auto">
                        
                     {
                       
                       data[0]?.dateTime.map((e)=>(
                       
                         <>
                            <div className="w-80">
                              {
                                e.slot?(<>
                                     {
                                       e.Booked?(<>
                                        
                                       </>):(<>
                                        <button onClick={()=>{reserve(e)}}  className="bg-white w-56 mx-2  mt-5 border-green-600 border-2 text-black  hover:bg-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                                      {dateFormat(e.slot, "mmmm dS,h:MM TT")} &#x2192;
                                     </button>
                                       
                                       </>)
                                     }
                                     
                                </>):(<>
                                  <button className="bg-white w-56 mx-2  mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                                    No Available Slots 
                                   </button>
                                </>)
                              }
                            
                           </div>
                          </>
                         
                       ))
                      
                     }
                    </div>

                     
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
            
            <button onClick={chat} className="bg-green-600 mx-auto  mt-5 border-green-600 border-2 text-white  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
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