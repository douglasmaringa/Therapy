import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../slices/TherapistAuth'
import { useNavigate } from 'react-router-dom';
import { db} from "../base";

function Nav() {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const[client,setClient]=useState(false)
  const[data,setData]=useState([])

  useEffect(() => {
    
    db.collection("chatroom").where("members", "array-contains", user.email).where("new","==",true).where("to","==",user.email)
    .onSnapshot((querySnapshot) => {
       
      setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
       
})

}, [user]);
  
  useEffect(() => {
   if(user){
     //console.log(user)
   }else{
     navigate("/login")
   }
  }, [user,navigate])

  useEffect(() => {
    if(user){
    db.collection("users").where("email","==",user.email)
    .onSnapshot((querySnapshot) => {
       
      //console.log(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
      setClient(false)
      }
    
})
db.collection("clients").where("email","==",user.email)
    .onSnapshot((querySnapshot) => {
      //console.log(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
        setClient(true)
        }else{
          setClient(false)
        }
})
    }
  }, [user])
  
  //console.log(client)

  const signOut = ()=>{
    dispatch(logout())
  }

  console.log(data)

  return (
    <div className='font-Rampart'>
      <nav class="bg-white border-gray-100 border-2 px-2 sm:px-4 py-4 rounded dark:bg-gray-800">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <a href="https://infallible-lamport-37a39c.netlify.app/" class="flex items-center">
      <img src="https://images.squarespace-cdn.com/content/v1/61d75d93d08895301e56f1cb/881daf16-85f1-4e1a-96e5-1786cbd71764/AndStillWeRise_logo_color_notag-sm.png?format=1500w" width={80} height={50} class="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Bridge</span>
  </a>
  <div class="flex items-center md:order-2">
    {
      client?(<>
      
      </>):(<>
        <button onClick={()=>{navigate("/profile")}} class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" type="button" data-dropdown-toggle="dropdown">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src={"https://png.pngtree.com/png-clipart/20190705/original/pngtree-cartoon-european-and-american-character-avatar-design-png-image_4366075.jpg"} alt="user"/>
      </button>
     
      </>)
    }
     
      
      <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul class="flex text-primary flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
      <li>
        <button  onClick={()=>{navigate("/home")}}  class="text-lg block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-primary md:hover:font-cursive md:p-0 dark:text-white" aria-current="page">Home</button>
      </li>
      <li>
        <button  class="text-lg block py-2 pr-4 pl-3  text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary md:hover:font-cursive md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Get Care</button>
      </li>
      <li>
        <button  class="text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary md:hover:font-cursive md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">For Providers</button>
      </li>
      <li>
        <button  class="text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary md:hover:font-cursive md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">For Health Plans</button>
      </li>
      <li>
        {
          data?.length > 0 ?(<>
          <button onClick={()=>{navigate("/connections")}} class="text-lg block py-2 pr-4 pl-3 text-secondary border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:hover:font-cursive md:border-0 md:hover:text-primary md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Connections <span className='text-red-700'>{data.length}</span></button>
     
          </>):(<>
            <button onClick={()=>{navigate("/connections")}} class="text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:hover:font-cursive md:border-0 md:hover:text-primary md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Connections</button>
     
          </>)
        }
         </li>
      <li>
        <button onClick={signOut} class="text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary md:hover:font-cursive md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</button>
      </li>
    </ul>
  </div>
  </div>
</nav>
    </div>
  )
}

export default Nav
