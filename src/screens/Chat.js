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
             
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
             
      })
    }, [user,state])
    
console.log(data)
  return (
    <div>
      <Nav/>  
      <h1 onClick={()=>{navigate("/connections")}}>back</h1>
   <ChatUi user={user} id={state.id} you={you} other={other}  messages={ data[0]?.messages}/>
    </div>
  )
}
