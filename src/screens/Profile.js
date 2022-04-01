import React, { useEffect,useState } from "react";
import {db} from '../base'
import Nav from "../components/Nav"
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import firebase from "firebase";
import dateFormat from 'dateformat';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




function Profile() {
   // const[data,setData]=useState([])
    const navigate = useNavigate();
    const[date,setDate]=useState("")
    const { user } = useSelector(state => state.user)

       const[id,setId]=useState("")
       const[data,setData]=useState([])

    const[title,setTitle]=useState("")
    const[about,setAbout]=useState("")
    const[away,setAway]=useState("")
    const[image,setImage]=useState("")
    const[name,setName]=useState("")
    const[other,setOther]=useState([])

    //booking modal state
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const openModal=()=>{
      setOpen(true)
    }
   

    //console.log(user.email)

    useEffect(() => {
       if(user){
      //using chatroom id we get from conversation page we then look for that chat room using the chatID feild we added in users and said was not neccessary
      db.collection("timeslots").where("email", "==", user.email)
      .onSnapshot((querySnapshot) => {
         
        setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
         
  })

}
}, [user])
console.log(data[0]?.bookings)

    useEffect(() => {
      if(user){
      db.collection("users").where("email","==",user?.email)
      .onSnapshot((querySnapshot) => {
         
        //setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
        querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).forEach((e)=>{
          setTitle(e.title)
          setAbout(e.about)
          setAway(e.away)
          setImage(e.image)
          setName(e.name)
          setOther(e)
          setId(e.id)
        })
      
  })
      }else{
          navigate("/")
      }
      
    }, [user?.email,navigate,user])

    const updateTitle = ()=>{
      if(title){
        db.collection('users').doc(id).update({
           
          title:title,
          
         })
         alert("updated")
      }
    }

    const updateAbout = ()=>{
      if(about){
        db.collection('users').doc(id).update({
           
          about:about,
          
         })
         alert("updated")
      }
    }

    const updateAway = ()=>{
      if(away){
        db.collection('users').doc(id).update({
           
         away:away,
          
         })
         alert("updated")
      }
    }

    //create availability
    const createBook = ()=>{
      console.log(date)
      db.collection('timeslots').doc(data[0]?.id).update({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
       dateTime:firebase.firestore.FieldValue.arrayUnion({"slot":date,"Booked":false})
       })
      alert("done")
    }

    //create availability
    const deleteBook = (e)=>{
      //deletes the current time slot
      db.collection('timeslots').doc(data[0]?.id).update({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
       dateTime:firebase.firestore.FieldValue.arrayRemove(e)
       })
      alert("deleted")
    }
     

    //console.log(data)

  return (
    <div>
        
     
<div>
        <Nav/>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div class="">
                        <h1 className="text-green-600  font-light text-3xl">When Are You Available</h1>
            <div className="">
                      <div class="flex">
                      <Stack component="form" noValidate spacing={3}>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        value={date}
        onChange={(e)=>{setDate(e.target.value)}}
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
                      </div>

                      <button onClick={createBook}  className="bg-white ml-1 w-full  mt-5 border-blue-600 border-2 text-black  hover:bg-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                     Create Availability
                      </button>
            </div>   
                        </div>
            </Typography>
        </Box>
      </Modal>

       
        <div className="lg:flex w-full sm:flex-col md:flex-row lg:flex-row mb-4 ">

        <div className="flex-auto w-24 ... mt-10 mx-auto">
           
           <img className="rounded-full mx-auto" src={image} width={220} height={180} alt="" />
           <div className="flex">
            {
                other?.online?(<>
               
                 <button className="bg-white m-auto mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                        Offers Video
                      </button>
                     
                </>):(<></>)
            }
             </div>

             <div className="flex">
            {
                other?.person?(<>
               
                 <button className="bg-white m-auto mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                        Offers in Person
                      </button>
                     
                </>):(<></>)
            }
             </div>
        </div>
        <div className="flex-auto w-64 ... mt-10 mx-auto">
            <h1 className="text-green-600 mt-10 font-light text-3xl">{name}</h1>
           
            <div className="w-full mt-4 pr-4">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
                          Title
                        </label>
                        <input value={title} onChange={(e)=>{setTitle(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter New Title"/>
                        <button onClick={updateTitle} className="bg-white  mt-5 border-red-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                      Update
                      </button>
                      </div>
            <h1 className="text-green-600 mt-10 font-light text-3xl">Next Available Times <span className="text-red-600">(Click to remove)</span></h1>
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
                                       <button title="Booked TimeSlot" className="w-56 mx-2  mt-5 bg-gray-400 border-black border-2 text-white font-bold py-2 px-4 rounded-lg ">
                                      {dateFormat(e.slot, "mmmm dS,h:MM TT")} &#x2192;
                                     </button>

                                       </>):(<>
                                        <button onClick={()=>{deleteBook(e)}} className="bg-white w-56 mx-2  mt-5 border-green-600 border-2 text-black  hover:bg-red-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
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

                      <button onClick={openModal} className="bg-white ml-1  mt-5 border-blue-600 border-2 text-black  hover:bg-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                     New
                      </button>
            </div>
            <h1 className="text-green-600 mt-10 ml-4 font-light text-3xl">Focus Area</h1>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 border-b-2 border-gray-400 pb-8">
            
            {
                other?.specialty?.map((m)=>(
                    <>
                     <button className="bg-gray-200  mr-4 ml-2 h-12 w-38 text-sm  mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold  px-4 rounded-3xl ">
                    {m} 
                      </button>
                    </>
                ))
            }
                    
                     
            </div>

            <h1 className="text-green-600 mt-10 font-light text-3xl">What do you want clients to know about you?</h1>
            <div className="flex border-b-2 border-gray-400 pb-8">
            
            <div className="w-full mt-4 pr-4">
                       
                        <textarea value={about} onChange={(e)=>{setAbout(e.target.value)}}  className="appearance-none h-80 block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter New Title"/>
                        <button onClick={updateAbout} className="bg-white  mt-5 border-red-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                      Update
                      </button>
                      </div>
            </div>
            
            <h1 className="text-green-600 mt-10 font-light text-3xl">What can clients expect to take away from sessions with you?</h1>
            <div className="flex border-b-2 border-gray-400 pb-8">
            
            <div className="w-full mt-4 pr-4">
                       
                        <textarea value={away} onChange={(e)=>{setAway(e.target.value)}}  className="appearance-none h-40 block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter New Title"/>
                        <button onClick={updateAway} className="bg-white  mt-5 border-red-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                      Update
                      </button>
                      </div>
            </div>
           
        </div>


        <div className="  flex-auto w-14 ... mt-10 mx-auto">
        

            <h1 className="text-green-600 mt-10 font-light ml-4 pr-4 text-3xl">Accepted Insurance</h1>
            <div className="flex border-b-2 border-gray-400 mr-10 pb-8">
            
           {other?.insurance?.map((m)=>(
               <>
               <p className="ml-4 mt-8">{m}</p>
               </>
           ))}
            </div>
            
            {
              data[0]?.bookings.map((e)=>(
                <p className="ml-4 mt-8">{e.email} ({e.slot} )</p>
              ))
            }

        </div>

        </div>

       
    </div>

    </div>
  )
}

export default Profile