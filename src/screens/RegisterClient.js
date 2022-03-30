import React,{useState,useEffect} from 'react'
import  "./Register.css"
import {useDispatch,useSelector} from 'react-redux'
import {registerClient} from "../slices/TherapistAuth"
import { useNavigate } from 'react-router-dom';
import { storage } from "../base";


function RegisterClient() {
 
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const[loading,setLoading]=useState("")
  
 
 //image state 

 const[imageAsFile,setImageAsFile]= useState("")
 const[imageAsUrl,setImageAsUrl]= useState("")

 const navigate = useNavigate();
 const dispatch = useDispatch()
 const { user } = useSelector(state => state.user)

 useEffect(() => {
   if(user){
    navigate("/home")
   }
 }, [user,navigate])
 
 //uploading image to firebase
 const handleImageAsFile=(e)=>{
  const image = e.target.files[0]
  setImageAsFile(imageFile=>(image))
  
}

const handleFireBaseUpload= (e)=>{
e.preventDefault()
  setLoading(true)
  console.log('start of upload')
  if(imageAsFile===''){
      console.error("not an image")
  }
  const uploadTask =storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  uploadTask.on('state_changed',(snapShot)=>{
      console.log(snapShot)
  },(err)=>{
      console.log(err)
  },()=>{
      storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseUrl=>{
          
        setImageAsUrl(firebaseUrl)
        alert("image uploaded")
        setLoading(false)
        
      })
  })
}


  
  const submit =(e)=>{
      e.preventDefault()
    //console.log(name,email,password,gender,city,ethnicity,about,education,away,image,insurance,focus,online,person)
    dispatch(registerClient({name:name,email:email,password:password,image:imageAsUrl}))
  }



  return (
    <div className="">

                    <form className=" text-black rounded-lg w-full mt-20 p-5 ml-10 mr-10 md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-lg">
                    
            <div class="flex items-center md:w-36">
							
							<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
						</div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                          Full Name
                        </label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name"/>
                       
                      </div>
                      <div className="w-full md:w-1/2 mt-4 px-3">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
                          Email
                        </label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter your email"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-password">
                          Password
                        </label>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******"/>
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                      </div>
                    </div>
                    <div class="flex">
                            <label for="exampleInputName1" class="text-dark">Image</label>
                            {
                                loading?(<>
                                <br/>
                                <h1 className='text-red-600'>loading....</h1>
                                </>):(<>
                                    
                                </>)
                            }
                            <input type="file" onChange={handleImageAsFile} placeholder="upload image" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                            <button onClick={handleFireBaseUpload} className="bg-white border-green-600 border-2 h-10 text-black rounded-3xl hover:bg-red-700 hover:text-white font-bold py-2 px-4 ">
                     Upload
                    </button>
                        </div>
                  
                      
                     
                      <button onClick={submit} className="bg-white border-green-600 border-2 text-black mr-2 mt-10 ml-auto hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
                       Register
                      </button>
                  
                  
                  
                  </form>
                  
                  
    </div>
  )
}

export default RegisterClient