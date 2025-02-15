"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function page() {
  const router= useRouter();
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const submitHandler = async(e:any)=>{
    e.preventDefault();
    //yaha value aa rha hai ?
    const response = await axios.post(
    
        "/api/add-blog",
        {
          title,
          description 
        }
    )
    if(response.data.success){
      alert("New Idea has been created")
      router.push("/")
    }
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg bg-white p-8 my-12 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center"><span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">Add </span>New</h2>
        <form onSubmit={submitHandler} method="post" className="flex flex-col gap-4">
          <input
            type="text"
            name="blogTitle"
            placeholder="Blog Title"
            className="bg-slate-200 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="blogDes"
            rows={4}
            placeholder="Blog Description"
            className="py-2 px-4 bg-slate-200 text-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDes(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white mt-4 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-800"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default page;
