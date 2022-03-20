import React, { useEffect,useState } from "react";
import {db} from '../base'
import Nav from "../components/Nav"
import {useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    const[data,setData]=useState([])
  
    const { user } = useSelector(state => state.user)

    const [open1, setOpen1] = React.useState(false);
    const handleClose = () => setOpen1(false);

    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const handleClose3 = () => setOpen3(false);

    const[id,setId]=useState("")

    const[title,setTitle]=useState("")
    const[about,setAbout]=useState("")
    const[away,setAway]=useState("")
   

    //console.log(user.email)

    useEffect(() => {

      db.collection("users").where("email","==",user.email)
      .onSnapshot((querySnapshot) => {
         
        setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
        
  })

      
    }, [user.email])

    const openModal=(id)=>{
        console.log(id)
        setId(id)
        setOpen1(true)
      }

      const openModal2=(id)=>{
        console.log(id)
        setId(id)
        setOpen2(true)
      }

      const openModal3=(id)=>{
        console.log(id)
        setId(id)
        setOpen3(true)
      }
      
      
      const update =()=>{
          if(title){
        db.collection('users').doc(id).update({
           
          title:title,
          
         })
         setTitle("")
         setOpen1(false)
      }
    else if(about){
        db.collection('users').doc(id).update({
           
            
            about:about,
           
           })
           setAbout("")
           setOpen1(false)
    }else if(away){
        db.collection('users').doc(id).update({
           
        
            away:away
           })
           setAway("")
           setOpen1(false)
    
    }else{
        alert("field cannot be empty")
        }

    }

    console.log(data)

  return (
    <div>
        <Modal
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                                 <div class="col-md-12 px-0 border-top">
                                 <div class="form-group">
                                        <label for="exampleInputName1">Professional Title</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </div>
                                   
                                   
                               
                        </div>

                        
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
         
            <span class="float-right"><div class="text-right">
                                                    <button onClick={()=>{update()}} class="btn btn-outline-primary px-3">Update</button>
                                                </div></span>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                                 <div class="col-md-12 px-0 border-top">
                                
                                    <div class="form-group">
                                        <label for="exampleInputName1">What Do u want clients to know about you?</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={about} onChange={(e)=>{setAbout(e.target.value)}}/>
                                    </div>
                                    
                                   
                               
                        </div>

                        
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
         
            <span class="float-right"><div class="text-right">
                                                    <button onClick={()=>{update()}} class="btn btn-outline-primary px-3">Update</button>
                                                </div></span>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                                 <div class="col-md-12 px-0 border-top">
                                
                                    <div class="form-group">
                                        <label for="exampleInputName1">What Do u want clients to take away from this?</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={away} onChange={(e)=>{setAway(e.target.value)}}/>
                                    </div>
                                   
                               
                        </div>

                        
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
         
            <span class="float-right"><div class="text-right">
                                                    <button onClick={()=>{update()}} class="btn btn-outline-primary px-3">Update</button>
                                                </div></span>
          </Typography>
        </Box>
      </Modal>

     
<div>
        <Nav/>
{
    data.map((e)=>(
        <>
        
       
        <div className="lg:flex w-full sm:flex-col md:flex-row lg:flex-row mb-4 ">

        <div className="flex-auto w-24 ... mt-10 mx-auto">
           
           <img className="rounded-full mx-auto" src={e.image} width={220} height={180} alt="" />
           <div className="flex">
            {
                e?.online?(<>
               
                 <button className="bg-white m-auto mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                        Offers Video
                      </button>
                     
                </>):(<></>)
            }
             </div>

             <div className="flex">
            {
                e?.person?(<>
               
                 <button className="bg-white m-auto mt-5 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-lg ">
                        Offers in Person
                      </button>
                     
                </>):(<></>)
            }
             </div>
        </div>
        <div className="flex-auto w-64 ... mt-10 mx-auto">
            <h1 className="text-green-600 mt-10 font-light text-3xl">{e.name}</h1>
            <h1 className=" font-light text-xl">{e.title}</h1>
            <button onClick={()=>{openModal(e.id)}} className="bg-red-900 m-auto mt-5 border-green-600 border-2 text-white  hover:bg-green-900 hover:text-red-800 font-bold py-2 px-4 rounded-lg ">
                       Edit
                      </button>
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
                e?.specialty?.map((m)=>(
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
            
                     <p className="font-light mt-4">{e.about}</p>
            </div>
            <button onClick={()=>{openModal2(e.id)}} className="bg-red-900 m-auto mt-5 border-green-600 border-2 text-white  hover:bg-green-900 hover:text-red-800 font-bold py-2 px-4 rounded-lg ">
                       Edit
                      </button>
            <h1 className="text-green-600 mt-10 font-light text-3xl">What can clients expect to take away from sessions with you?</h1>
            <div className="flex border-b-2 border-gray-400 pb-8">
            
                     <p className="font-light mt-4">{e.away}</p>
            </div>
            <button onClick={()=>{openModal3(e.id)}} className="bg-red-900 m-auto mt-5 border-green-600 border-2 text-white  hover:bg-green-900 hover:text-red-800 font-bold py-2 px-4 rounded-lg ">
                       Edit
                      </button>
        </div>


        <div className="  flex-auto w-14 ... mt-10 mx-auto">
        

            <h1 className="text-green-600 mt-10 font-light ml-4 pr-4 text-3xl">Accepted Insurance</h1>
            <div className="flex border-b-2 border-gray-400 mr-10 pb-8">
            
           {e?.insurance?.map((m)=>(
               <>
               <p className="ml-4 mt-8">{m}</p>
               </>
           ))}
            </div>

        </div>

        </div>

        </>
    ))
}
    </div>

    </div>
  )
}

export default Profile