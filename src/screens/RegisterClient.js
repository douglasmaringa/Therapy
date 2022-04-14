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
  const[gender,setGender]=useState("")
  const[ethnicity,setEthnicity]=useState("")
  const[specialty,setSpecialty]=useState("")
  const[reasons,setReasons]=useState("")
  const[medium,setMedium]=useState("")
  const[hear,setHear]=useState("")
  const[language,setLanguage]=useState("")
  const[clientType,setClientType]=useState("")
  const[paymentType,setPaymentType]=useState("")

  const[insuranceNumber,setInsuranceNumber]=useState("")
  const[insuranceName,setInsuranceName]=useState("")
 
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
    dispatch(registerClient({name:name,email:email,password:password,image:imageAsUrl,gender:gender,ethnicity:ethnicity,specialty:specialty,reasons:reasons,medium:medium,hear:hear,language:language,clientType:clientType,paymentType:paymentType,insuranceName:insuranceName,insuranceNumber:insuranceNumber}))
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

                        <div className="w-full md:w-full mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                          Reason(s) for requesting an appointment
                        </label>
                        <input value={reasons} onChange={(e)=>{setReasons(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name"/>
                       
                      </div>

                      <div className="w-full md:w-full mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                        How do you prefer to attend your sessions?
                        </label>
                        <input value={medium} onChange={(e)=>{setMedium(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                      </div>

                      <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-city">
                         Client Type
                        </label>
                        <select value={clientType} onChange={(e)=>{setClientType(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Minor</option>
                            <option>Individual</option>
                            <option>Couple</option>
                          </select> </div>

                          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-city">
                         Payment Type
                        </label>
                        <select value={paymentType} onChange={(e)=>{setPaymentType(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Private</option>
                            <option>Sliding Scale</option>
                            <option>Insurance</option>
                            <option>EAP</option>
                          </select> </div>

                          {(() => {
                           if (paymentType === 'Insurance'){
                             return (
                             <div>
                               <div className="w-full md:w-full mt-4 px-3 mb-6 md:mb-0">
                               <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                                Insurance Name
                                 </label>
                               <input value={insuranceName} onChange={(e)=>{setInsuranceName(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                              </div>

                              <div className="w-full md:w-full mt-4 px-3 mb-6 md:mb-0">
                               <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                                Insurance Number
                                 </label>
                               <input value={insuranceNumber} onChange={(e)=>{setInsuranceNumber(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                              </div>

                              </div>
                                    )
                               }
              
                            return null;
                               })()}

                      <div className="w-full md:w-full mt-2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-zip">
                         Specialty
                        </label>
                        <select value={specialty} onChange={(e)=>{setSpecialty(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Anxiety</option>
                            <option>Mental</option>
                            <option>Addiction</option>
                            <option>Grief</option>
                            <option>Love-Issues</option>
                            <option>Stress</option>
                            <option>Anger-Issues</option>
                            <option>Mens-Issues</option>
                            <option>LGBTQIA+</option>
                            <option>Depression</option>
                            <option>Bipolar</option>
                            <option>PTSD</option>
                            <option>ADD/ADHD</option>
                          </select>
                      </div>

                      <div className="w-full md:w-full mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                         How did You hear About Us?
                        </label>
                        <input value={hear} onChange={(e)=>{setHear(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                      </div>

                      <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-city">
                          If you have Prefered Gender state below
                        </label>
                        <select value={gender} onChange={(e)=>{setGender(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Transgender</option>
                          </select> </div>
                      
                          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-zip">
                         If you have Prefered Ethnicity state below
                        </label>
                        <select value={ethnicity} onChange={(e)=>{setEthnicity(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>African American</option>
                            <option>Mixed Race</option>
                            <option>Caucasian</option>
                            <option>Latino</option>
                            <option>Asian</option>
                          </select>
                      </div>

                      <div className="w-full md:w-full mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                         If you have a Prefered Language state below
                        </label>
                        <input value={language} onChange={(e)=>{setLanguage(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                      </div>
                      
                     
                      <button onClick={submit} className="bg-white border-green-600 border-2 text-black mr-2 mt-10 ml-auto hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
                       Register
                      </button>
                  
                  
                  
                  </form>
                  
                  
    </div>
  )
}

export default RegisterClient