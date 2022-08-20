import React,{useState,useEffect} from 'react'
import  "./Register.css"
import {useDispatch,useSelector} from 'react-redux'
import {register} from "../slices/TherapistAuth"
import { useNavigate } from 'react-router-dom';
import { storage } from "../base";
import Multiselect from 'multiselect-react-dropdown';
import Nav2 from '../components/Nav2';

function Register() {
  const[step,setStep]=useState(1)
//first page
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const[title,setTitle]=useState("")
  const[city,setCity]=useState("")
  const[gender,setGender]=useState("")
  const[ethnicity,setEthnicity]=useState("")

  //second page
  const[about,setAbout]=useState("")
  const[education,setEducation]=useState("")
  const[away,setAway]=useState("")
  const[loading,setLoading]=useState("")
  
 //third page
 const[insurance,setInsurance]=useState([])
 const[focus,setFocus]=useState([])
 const[online,setOnline]=useState(false)
 const[person,setPerson]=useState(false)

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
    dispatch(register({name:name,email:email,password:password,gender:gender,city:city,ethnicity:ethnicity,about:about,education:education,away:away,image:imageAsUrl,insurance:insurance,focus:focus,online:online,person:person,title:title}))
  }

console.log(step)

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
   name: 'Self-Esteem',
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
   name: 'Eating Disorder',
    id: 5,
  },
  {
   name: 'Stress',
   id: 6,
  },
  {
    name: 'Anger',
    id: 7,
  },
  {
   name: 'Relationship',
   id:8,
  },
  {
   name: 'Grief',
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
      <Nav2/>
{(() => {
              if (step === 1){
                  return (
                    <form className=" text-black rounded-lg w-full mt-3 p-5 ml-10 mr-10 md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-lg">
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
                    <div className="w-full md:w-1/2 mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                         Title
                        </label>
                        <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Licensed Clinical Social Worker"/>
                       
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

                      <label className="block uppercase mt-5 tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                        What do you want clients to know about you?
                      </label>
                      <textarea value={about} onChange={(e)=>{setAbout(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="I'm"/>
                      
                    </div>
                    <div className="w-full">
                      <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-last-name">
                        What do you want clients to take away from this session.
                      </label>
                      <textarea value={away} onChange={(e)=>{setAway(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="That"/>
                    </div>
                  </div>
                  <div className="flex flex-wrap  mb-6">
                    <div className="w-full ">
                      <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-password">
                       Educational Background
                      </label>
                      <textarea value={education} onChange={(e)=>{setEducation(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="I studied at"/>
                      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-2">
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
                            <button onClick={handleFireBaseUpload} className="bg-white border-secondary border-2 h-10 text-black rounded-3xl hover:bg-red-700 hover:text-white font-bold py-2 px-4 ">
                     Upload
                    </button>
                        </div>
                   
                   
                
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
 
  <div className="flex flex-wrap mb-6">
    <div className="w-full mt-4 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
        Insuarance Accepted
      </label>
      <Multiselect
options={insuranceData} // Options to display in the dropdown

onSelect={(selectedList, selectedItem)=>{setInsurance(insurance=>[...insurance,selectedItem.name])}} // Function will trigger on select event
onRemove={()=>setInsurance([])} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
    </div>
    <div className="w-full ">
      <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-last-name">
        Area of Focus
      </label>
      <Multiselect
options={focusData} // Options to display in the dropdown

onSelect={(selectedList, selectedItem)=>{setFocus(focus=>[...focus,selectedItem.name])}} // Function will trigger on select event
onRemove={()=>setFocus([])} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
</div>
  </div>
  <div className="flex flex-wrap  mb-6">
    <div className="w-full">
      <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-password">
        Offer Video
      </label>
      <input type="checkbox" id="vehicle1" name="vehicle1"  value={online} onChange={(e)=>{setOnline(true)}} />
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div className="flex flex-wrap  mb-2">
    <div className="w-full  mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-city">
       In-Person
      </label>
      <input type="checkbox" id="vehicle1" name="vehicle1"  value={person} onChange={(e)=>{setPerson(true)}} />
    </div>
    
   
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

export default Register
