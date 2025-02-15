"use client";
import React from "react";
import {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation"
function page({params}:any) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  
  const submitHandler= async(e:any)=>{
    const id = await params;
    // params se id to aa rhi hai lekin wo humko string chahiye
    //jab params se id 
    const ideaId=id.id
    
    e.preventDefault();
    // jo chahiye tha wo mil gya ? string chahiye tha
    
    const response = await axios.put(
    
        `/api/edit-blog/${ideaId}`,
        {
           title,
           description 
        }
    )
    console.log(response)
    if(response.data.success){
        alert("Idea Updated");
        router.push("/");
        // i mean jaise hi update ho hum home page pe chale jaye ok? ok
    }
  }
  
  return (
    <div>
      <h2 className="text-2xl my-8">Edit Blog</h2>
      <form method="post" onSubmit={submitHandler} className="flex gap-3 flex-col border p-6 mx-8 bg-white ">
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

        <button className="bg-black  text-gray-500 mt-5 px-4 py-1 rounded-md cursor-pointer">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default page;
// ye ku kar diya phle dursa tha 
// blog m change nhi ho rha hai
// gajab aadmi ho wahi to dhire dhire pahuch rhe hai 