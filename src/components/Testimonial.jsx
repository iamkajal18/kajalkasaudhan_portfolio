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
    <div className="mt-10 max-w-6xl mx-auto px-6 py-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-12">
  <h3 className="text-2xl font-extrabold text-gray-900 tracking-wide w-full text-center">
    <span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
      What</span> Our Clients Say
  </h3>

  <Link href="/testimonial">
  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg py-2 px-3 text-white text-sm font-semibold hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg">
  + Add Testimonial
</button>

  </Link>
</div>

      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
        {feedbacks.map((feedback, key) => (
          <div
            key={key}
            className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50 cursor-pointer "
          >
            <figure className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-5 text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
              </svg>
              <blockquote>
                <p className="text-xl italic font-medium text-gray-800 leading-relaxed">“{feedback.testimonial}”</p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-4">
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                  src={feedback.image || "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
                  alt="User profile"
                />
                <div className="text-left">
                  <cite className="block font-semibold text-gray-900 text-lg">{feedback.name}</cite>
                  <cite className="text-sm text-gray-500">{feedback.email}</cite>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
