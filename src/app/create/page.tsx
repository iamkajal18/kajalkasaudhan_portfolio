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
    <div>
      <h2 className="text-2xl my-8">Add New</h2>
      <form onSubmit={submitHandler} method="post" className="flex gap-3 flex-col border p-6 mx-8 bg-white ">
        <input
          type="text"
          name="blogTitle"
          placeholder="Blog Title"
          className="bg-slate-200 text-black rounded-md"
          value={title}
          onChange={
            (e)=>{
                setTitle(e.target.value)
            }
          }
        ></input>
        <textarea
          name="blogDes"
          rows={4}
          placeholder="Blog Description"
          className="py-1 px-4 text-black rounded-md resize-none"
          value={description}
          onChange={
            (e)=>{
                setDes(e.target.value)
            }
          }
        ></textarea>
        <button
          type="submit"
          className="bg-black  text-gray-500 mt-5 px-4 py-1 rounded-md cursor-pointer"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default page;
