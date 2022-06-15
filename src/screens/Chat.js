import React,{useEffect,useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import {useSelector} from 'react-redux'
import ChatUi from '../components/ChatUi';
import {db} from "../base"

export default function Chat() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const[data,setData]=useState([])
    const[other,setOther]=useState("")
    const[you,setYou]=useState("")
    const[client,setClient]=useState(true)
    const [verified, setVerified] = React.useState(false);


    const { user } = useSelector(state => state.user)

    console.log(state)

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
    
    
console.log(verified)
  return (
    <div>
      <Nav/>  
     
   <ChatUi client={client} verified={verified} user={user} id={state.id} you={you} other={other}  messages={ data[0]?.messages}/>
    </div>
  )
}
