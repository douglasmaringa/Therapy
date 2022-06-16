import React from "react";
import { useLocation} from 'react-router-dom';
import Nav from "../components/Nav";



function ClientDetails() {
    const {state} = useLocation();
   

    
   
  console.log(state)
  
  return (
    <div>
        <Nav/>
        <div className="lg:flex w-full sm:flex-col md:flex-row lg:flex-row mb-4 mr-10 ">

       
        <div className="flex-auto w-64 ... mt-10 mx-auto">
           <div className="flex-auto w-64 ... mt-10 mx-auto">
           
           {
                                     state?.preference?.length > 0 ?(<>
                                     <div class="form-group">
                                   <h1 style={{fontWeight:"bold",marginBottom:'10px'}}>Preference</h1>
                                   <label for="exampleInputName1">Client type:{state?.preference[0]?.clientType}</label>
                                   
                                    </div>
                               <div class="form-group">
                               <label for="exampleInputName1">Gender:{state?.preference[0]?.gender}</label>
                                   </div>

                                   <div class="form-group">
                               <label for="exampleInputName1">Specialty:{state?.preference[0]?.specialty}</label>
                                   </div>

                                   <div class="form-group">
                               <label for="exampleInputName1">Language:{state?.preference[0]?.language}</label>
                                   </div>

                                   <div class="form-group">
                               <label for="exampleInputName1">Payment Type:{state?.preference[0]?.paymentType}</label>
                                   </div>

                                   <div class="form-group">
                               <label for="exampleInputName1">Ethnicity:{state?.preference[0]?.ethnicity}</label>
                                   </div>
                                   <div class="form-group">
                               <label for="exampleInputName1">Where did You Hear About Us:{state?.preference[0]?.hear}</label>
                                   </div>

                                   <div class="form-group">
                               <label for="exampleInputName1">Medium:{state?.preference[0]?.medium}</label>
                                   </div>
                                   <div class="form-group">
                               <label for="exampleInputName1">Reasons:{state?.preference[0]?.reasons}</label>
                                   </div>
                                   
                                     </>):(<></>)
                                   }
                                 

                  
                            

                     
            </div>
           
            
        </div>


        <div className="  flex-auto w-14 ... mt-20 mx-auto">
           
        {
                                     state?.insurance?.length > 0 ?(<>
                                     <div class="form-group">
                                   <h1 style={{fontWeight:"bold",marginBottom:'10px'}}>Insurance Information</h1>
                                   <label for="exampleInputName1">Insurance Name:{state?.insurance[0]?.insuranceName}</label>
                                   
                                    </div>
                               <div class="form-group">
                               <label for="exampleInputName1">Insurance Number:{state?.insurance[0]?.insuranceNumber}</label>
                                   </div>

                                   <div class="form-group">
                                     <img src={state?.insurance[0]?.insuranceImage} width={220} alt="" />
                                  </div>
                                     </>):(<></>)
                                   }
                                 
                                 <h1>Client Name:{state?.name}</h1>
                                 {
                                   state?.verified?(<>
                                   <button class="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >User Verified</button>
                                   </>):(<>
                                    <button class="bg-red-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >User  Not verified</button>
                                   </>)
                                 }
                                 
        </div>

        </div>
    </div>
  )
}

export default ClientDetails