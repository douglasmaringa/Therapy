import React,{useState,useEffect} from 'react'
import  "./Register.css"
import {useDispatch,useSelector} from 'react-redux'
import {login} from "../slices/TherapistAuth"
import { useNavigate } from 'react-router-dom';

function Login() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const navigate = useNavigate();
 const dispatch = useDispatch()
 const { user } = useSelector(state => state.user)

 useEffect(() => {
   if(user){
    navigate("/home")
   }
 }, [user,navigate])

 const submit =(e)=>{
 e.preventDefault()
  dispatch(login({email:email,password:password}))
}

const register =(e)=>{
  e.preventDefault()
  navigate("/register")
 }

  return (
    <div>
       <form className=" text-black rounded-lg w-full mt-20 p-5 ml-10 mr-10 md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-lg">
                     
                  <div className="flex flex-wrap -mx-3 mb-6">
                      
                      <div className="w-full mt-4 px-3">
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

                    <div className='flex'>
                      <button onClick={register} className="bg-white border-red-600 border-2 text-black mr-2 mt-10  hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
                       Don't Have An Account?
                      </button>
                    
                      <button onClick={submit} className="bg-white border-green-600 border-2 text-black mr-2 mt-10 ml-auto hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
                       Sign in
                      </button>
                      </div>
                  
                  
                  </form>
    </div>
  )
}

export default Login