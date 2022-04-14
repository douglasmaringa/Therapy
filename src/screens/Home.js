import React, { useEffect,useState } from "react";
import {db} from '../base'
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux'
import Nav from "../components/Nav"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Home() {
  const[data,setData]=useState([])
  const[data2,setData2]=useState([])
    const navigate = useNavigate();
    //const { user } = useSelector(state => state.user)

    //console.log(user.email)

    const [ethnicity, setEthnicity] = React.useState('');
    const [city, setCity] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [verified, setVerified] = React.useState(false);

    const[client,setClient]=useState(false)
    const { user } = useSelector(state => state.user)

    useEffect(() => {

        db.collection("users")
        .onSnapshot((querySnapshot) => {
           
          setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
          
    })

    db.collection("clients").where("email","==",user.email)
    .onSnapshot((querySnapshot) => {
      //console.log(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
        setClient(true)
        setVerified(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0]?.verified)
        setGender(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0]?.preference[0].gender)
        setEthnicity(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0]?.preference[0].ethnicity)
       
      }else{
          setClient(false)
        }
})
  
        
      }, [user])
  
    const submit =()=>{
      console.log(ethnicity,gender)
        var person = { ethnicity: ethnicity, gender: gender,city:city},
    
    scores = data.map(function (a) {
        var score = 0,
            constraints = [
                { keys: ['ethnicity'], fn: function (p, f) { return p === f; } },
                { keys: ['city'], fn: function (p, f) { return p === f; }, },
                { keys: ['gender'], fn: function (p, f) { return p === f; }, },
            ];

        constraints.forEach(function (c) {
            c.keys.forEach(function (k) {
                score += c.fn(person[k], a[k]);
            });
        });
        return { score: score, name: a.name,title:a.title,image:a.image,about:a.about,wholeObj:a };
    });

scores.sort(function (a, b) { return b.score - a.score; });

console.log(scores.slice(0, 3).map(function (a)  {return {  name: a.name }}));
console.log(scores);
setData2(scores.slice(0, 2))
    }

   

    const details=(wholeObj)=>{
      navigate('/details', { state: wholeObj});
  }
    
  console.log(verified)

  return (
    <div>
      <Nav/>
      {
        client?(<>
         <button className="ml-80 mt-10 h-16 px-10 text-white bg-blue-700" onClick={submit}>Get Your Therapist</button>
   
        </>):(<>
          <div className="flex">
      <Box sx={{ minWidth: 120 }} className='w-40 ml-40 mt-10'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ethnicity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ethnicity}
          label="Ethnicity"
          onChange={(e)=>{ setEthnicity(e.target.value)}}
        >
          <MenuItem value={"Caucasian"}>Caucasian</MenuItem>
          <MenuItem value={"Latino"}>Latino</MenuItem>
          <MenuItem value={"Asian"}>Asian</MenuItem>
          <MenuItem value={"Mixed Race"}>Mixed</MenuItem>
          <MenuItem value={"African American"}>African</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }} className='w-40 ml-20 mt-10'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
          onChange={(e)=>{ setCity(e.target.value)}}
        >
          <MenuItem value={"Boston"}>Boston</MenuItem>
          <MenuItem value={"Cambridge"}>Cambridge</MenuItem>
          <MenuItem value={"New York"}>New York</MenuItem>
          <MenuItem value={"California"}>California</MenuItem>
          <MenuItem value={"Missouri"}>Missouri</MenuItem>
          <MenuItem value={"Texas"}>Texas</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }} className='w-40 ml-20 mt-10'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={(e)=>{ setGender(e.target.value)}}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Transgender"}>Transgender</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <button className="ml-10 mt-10 px-10 text-white bg-blue-700" onClick={submit}>Find Therapist</button>
    </div>


        </>)
      }
      
      {
        data2?.map((e)=>(
          <>
           <div class="p-10 lg:mx-20 font-serif">
   
   <div class=" w-full lg:max-w-full lg:flex">
     <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-no-repeat bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"backgroundImage": `url('${e.image}')`}} title="Mountain">
     </div>
     <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
         <p class="text-sm text-gray-600 flex items-center">
           <svg class="fill-current text-blue-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
             <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
           </svg>
           {
               e?.score?(<>
                <h1 className="text-red-700">{e.score*34-2}% Match</h1>
               </>):(<>
               </>)
           }
          
         </p>
         {
           verified?(<>
            <div class="text-green-600 font-bold text-xl mb-2 hover:text-green-900 cursor-pointer" onClick={()=>{details(e.wholeObj)}}>{e.title}</div>
        
           </>):(<>
            <div class="text-green-600 font-bold text-xl mb-2 hover:text-green-900 cursor-pointer" >{e.title} <span className="text-red-800">Will Be Able To View When Verified</span></div>
        
           </>)
         }
         <p class="text-gray-700 text-base">{e.about}</p>
       </div>
       <div class="flex items-center">
         <img class="w-10 h-10 rounded-full mr-4" src={e.image} alt="Avatar of Writer"/>
         <div class="text-sm">
           <p class="text-green-600  leading-none">{e.name}</p>
         
         </div>
       </div>
     </div>
   </div>
 </div>

  
          </>
        ))
      }
      
      </div>
  )
}

export default Home