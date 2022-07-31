import React,{useState,useEffect} from 'react'
import  "./Register.css"
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { storage } from "../base";
import Multiselect from 'multiselect-react-dropdown';
import {registerClient} from "../slices/TherapistAuth"

function RegisterClient() {
  const[step,setStep]=useState(1)
//first page
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const[reasons,setReasons]=useState("")
  const[city,setCity]=useState("boston")
  const[gender,setGender]=useState("male")
  const[ethnicity,setEthnicity]=useState("African American")

  //second page
  const[specialty,setSpecialty]=useState("Anxiety")
  const[loading,setLoading]=useState("")
  
 //third page
 const[clientType,setClientType]=useState("Minor")
  const[medium,setMedium]=useState("")
  const[hear,setHear]=useState("")
 const[paymentType,setPaymentType]=useState("")
 const[insuranceName,setInsuranceName]=useState("")
 const[insuranceNumber,setInsuranceNumber]=useState("")
 const[online,setOnline]=useState(false)
 const[language,setLanguage]=useState("")
 //image state 
 const allInputs={imgUrl:''}
 const[imageAsFile,setImageAsFile]= useState("")
const[imageAsUrl,setImageAsUrl]= useState(allInputs)

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


  const next = (e)=>{
    e.preventDefault()
    if(step<3){
    setStep(step + 1)
    }else{
      console.log("its now 4")
      submit()
    }
  }
  const prev = (e)=>{
    e.preventDefault()
    if(step>1){
      setStep(step - 1)
      }else{
        console.log("its now 1")
        
      }
  }

  const submit =()=>{
   
  //console.log(name,email,password,gender,city,ethnicity,about,education,away,image,insurance,focus,online,person)
  dispatch(registerClient({name:name,email:email,password:password,image:imageAsUrl,gender:gender,ethnicity:ethnicity,specialty:specialty,reasons:reasons,medium:medium,hear:hear,language:language,clientType:clientType,paymentType:paymentType,insuranceName:insuranceName,insuranceNumber:insuranceNumber}))
}



//drop down data
const insuranceData = [
  {
    name: 'Private Pay',
    id: 1,
  },
  {
    name: 'BCBS',
    id: 2,
  },
  {
   name: 'Optum',
    id: 3,
  },
  {
    name: 'Cigna',
    id: 4,
  },
  {
   name: 'Aetna',
   id: 5,
  }
];

const focusData = [
  {
   name: 'Anxiety',
    id: 1,
  },
  {
   name: 'Mental',
    id: 2,
  },
  {
   name: 'Addiction',
   id: 3,
  },{
   name: 'Grief',
    id: 4,
  },
  {
   name: 'Love-Issues',
    id: 5,
  },
  {
   name: 'Stress',
   id: 6,
  },
  {
    name: 'Anger-Issues',
    id: 7,
  },
  {
   name: 'Mens-Issues',
   id:8,
  },
  {
   name: 'LGBTQIA+',
    id: 9,
  },{
  name: 'Depression',
   id: 10,
  },
  {
    name: 'Bipolar',
    id: 11,
  },
  {
   name: 'PTSD',
    id: 12,
  },
  {
   name: 'ADD/ADHD',
    id: 13,
  }
 
 
];

  return (
    <div className="font-Rampart">
{(() => {
              if (step === 1){
                  return (
                    <form className=" text-black rounded-lg w-full mt-20 p-5 ml-10 mr-10 md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-lg">
                      <h1 className="text-sm font-extrabold">Step 1</h1>
            <div class="flex items-center md:w-36">
							<div class="w-full bg-secondary rounded-full mr-2">
							<div class="rounded-full text-xs leading-none h-2 text-center text-white"></div>
							</div>
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
                    <div className="w-full mt-4 mb-10 md:mb-6">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                        Reason(s) for requesting an appointment
                        </label>
                        <select value={reasons} onChange={(e)=>{setReasons(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Therapy</option>
                            <option>Life Coaching</option>
                            <option>Free 15 Minute Consultation</option>
                          </select> 
                      </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-city">
                         Gender
                        </label>
                        <select value={gender} onChange={(e)=>{setGender(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Transgender</option>
                          </select> </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-state">
                          State
                        </label>
                        <div className="relative">
                          <select value={city} onChange={(e)=>{setCity(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Boston</option>
                            <option>Cambridge</option>
                            <option>New York</option>
                            <option>California</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-zip">
                         Ethnicity
                        </label>
                        <select value={ethnicity} onChange={(e)=>{setEthnicity(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>African American</option>
                            <option>Mixed Race</option>
                            <option>Caucasian</option>
                            <option>Latino</option>
                            <option>Asian</option>
                          </select>
                      </div>
                  
                      <button onClick={prev}  className="bg-white border-secondary border-2 text-black ml-4 rounded-3xl mt-10 hover:bg-primary hover:text-white font-bold py-2 px-4 ">
                        Previous
                      </button>
                     
                      <button onClick={next} className="bg-white border-secondary border-2 text-black mr-2 mt-10 ml-auto hover:bg-secondary hover:text-white font-bold py-2 px-4 rounded-3xl">
                        Next Step
                      </button>
                  
                  
                    </div>
                  </form>
                  
                  )
              }else if(step ===2){
                return (
                  <form className=" text-black rounded-lg w-full mt-20 p-5 ml-10 mr-10 md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-lg">
                  <div className="flex flex-wrap mb-6">
                    <div className="w-full  mb-6 md:mb-0">

                  <h1 className="text-sm font-extrabold">Step 2</h1>
            <div class="flex items-center md:w-60">
							<div class="w-full bg-secondary rounded-full mr-2">
							<div class="rounded-full  text-xs leading-none h-2 text-center text-white"></div>
							</div>
							<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
						</div>

            <div className="w-full md:w-full mt-2 mb-6 md:mb-6">
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
                    </div>

                    <div className="w-full md:w-full mb-6 md:mb-6">
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

                              <div class="flex">
                            <label for="exampleInputName1" class="text-dark">Take An Image of the Card</label>
                            {
                                loading?(<>
                                <br/>
                                <h1 className='text-red-600'>loading....</h1>
                                </>):(<>
                                    
                                </>)
                            }
                            <input type="file" onChange={handleImageAsFile} placeholder="upload image" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                            <button onClick={handleFireBaseUpload} className="bg-white border-secondary border-2 h-10 text-black rounded-3xl hover:bg-primary hover:text-white font-bold py-2 px-4 ">
                     Upload
                    </button>
                        </div>

                              </div>
                                    )
                               }
              
                            return null;
                               })()}


                   
                  </div>
                 
                  <div className="flex flex-wrap mb-2">
                  
                   
                   
                
                    <button onClick={prev} className="bg-white border-secondary border-2 text-black ml-4 rounded-3xl mt-10 hover:bg-primary hover:text-white font-bold py-2 px-4 ">
                      Previous
                    </button>
                   
                    <button onClick={next} className="bg-white border-secondary border-2 text-black mr-2 mt-10 ml-auto hover:bg-secondary hover:text-white font-bold py-2 px-4 rounded-3xl">
                      Next Step
                    </button>
                
                
                  </div>
                </form>
                
              )

              }else if(step ===3){
                return (
                  <form className=" text-black rounded-lg w-full mt-20 p-5 ml-10 mr-10 md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-lg">
  <h1 className="text-sm  font-extrabold">Step 3</h1>
            <div class="flex items-center md:w-100">
							<div class="w-full bg-secondary rounded-full mr-2">
							<div class="rounded-full  text-xs leading-none h-2 text-center text-white"></div>
							</div>
							<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
						</div>
 
            <div className="w-full md:w-full mt-4 mb-6 md:mb-6">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                          Reason(s) for requesting an appointment
                        </label>
                        <input value={reasons} onChange={(e)=>{setReasons(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name"/>
                       
                      </div>

                      <div className="w-full md:w-full mt-4 mb-6 md:mb-6">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                        How do you prefer to attend your sessions?
                        </label>
                        <input value={medium} onChange={(e)=>{setMedium(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                      </div>

                      <div className="w-full md:w-full mb-6 md:mb-6">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-city">
                         Client Type
                        </label>
                        <select value={clientType} onChange={(e)=>{setClientType(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Minor</option>
                            <option>Individual</option>
                            <option>Couple</option>
                          </select> </div>

                          <div className="w-full md:w-full mt-4  mb-6 md:mb-6">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                         If you have a Prefered Language state below
                        </label>
                        <input value={language} onChange={(e)=>{setLanguage(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
                       
                      </div>
  <div className="flex flex-wrap  mb-2">
    
    
   
    <button onClick={prev} className="bg-white border-secondary border-2 text-black ml-4 rounded-3xl mt-10 hover:bg-primary hover:text-white font-bold py-2 px-4 ">
      Previous
    </button>
   
    <button onClick={next} className="bg-white border-secondary border-2 text-black mr-2 mt-10 ml-auto hover:bg-secondary hover:text-white font-bold py-2 px-4 rounded-3xl">
      Next Step
    </button>


  </div>
</form>

              )

              }
              
              return null;
            })()}

      

    </div>
  )
}

export default RegisterClient