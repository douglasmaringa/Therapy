import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import {useSelector} from 'react-redux'
import ChatUi from '../components/ChatUi';
import {db} from "../base"

export default function Chat() {
    const {state} = useLocation();
    
    const[data,setData]=useState([])
    const[other,setOther]=useState("")
    const[you,setYou]=useState("")
    const[client,setClient]=useState(true)
    const [verified, setVerified] = React.useState(false);
    const[details,setDetails]=useState([])

    const { user } = useSelector(state => state.user)

    //console.log(state)

    useEffect(() => {
        if(state.members[0]===user.email){
            setYou(state.members[0])
            setOther(state.members[1])
        }else{
            setYou(state.members[1])
            setOther(state.members[0])
        }
        db.collection("chatroom").where("chatID", "==", state.id)
          .onSnapshot((querySnapshot) => {
             //sending a message to the chat room 
       
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
             
      })
    }, [user,state])

    useEffect(() => {
      db.collection("clients").where("email","==",user.email)
      .onSnapshot((querySnapshot) => {
        //console.log(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
        if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
         
          setVerified(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0]?.verified)
          }else{
            setClient(false)
          }})

         
    }, [])

    useEffect(() => {
      //console.log(state.members.filter((e)=> e != user.email)[0])
      db.collection("clients").where("email","==",state?.members?.filter((e)=> e != user.email)[0])
      .onSnapshot((querySnapshot) => {
        //console.log(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
        
         
          setDetails(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
         
        })

         
    }, [])
    
    
//console.log("details",details)
  return (
    <div className='font-Rampart'>
      <Nav/>  
     
   <ChatUi details={details} client={client} verified={verified} user={user} id={state.id} you={you} other={other}  messages={ data[0]?.messages} chatroom={state}/>
    </div>
  )
}
