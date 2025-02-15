import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";



function Testimonial() {
  
  const [feedbacks,setFeedback]=useState([]);
  const getfeedback=async()=>{
    try {
        const response=await axios.get("/api/get-feedback");
        if(response.data.success){
            setFeedback(response.data.feedbacks);
        }
        
    } catch (error) {
        console.log("Something went wrong",error);
    }
  }

  useEffect(()=>{
    getfeedback();
  },[]);
   
  

  return (
    <div className="mt-5">
   <div className="flex  justify-between">
   <h3 className="text-center mb-7 font-bold text-2xl">Our happy users!!</h3>
   <Link href="/testimonial">
                <button className="bg-blue-800 rounded-md py-2 px-3 text-white hover:bg-blue-600">
                  Add New
                </button>
              </Link>
   </div>
      
      <div className="grid md:grid-cols-3 lg:grid-row-3 gap-3">
      
    {feedbacks.map((feedback,key)=>(
      <div  className=" p-4 rounded-xl  hover:animate-pulse mx-7 shadow-gray-500 shadow-sm-light"> 
         <figure class="max-w-screen-md mx-auto text-center">
    <svg class="w-5 h-5 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
    <blockquote>
        <p class="text-2xl italic font-medium text-gray-900 dark:text-white">{feedback.testimonial}</p>
    </blockquote>
    <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
        <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture"/>
        <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <cite class="pe-3 font-medium text-gray-900 dark:text-white">{feedback.name}</cite>
            <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">{feedback.email}</cite>
        </div>
    </figcaption>
</figure>
      </div>
     
    )
    )}

</div>
    </div>
    
  );
}

export default Testimonial;
