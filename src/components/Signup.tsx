"use client"
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// kisi form me jake dekho process kya hai submit ad ma phle form toh shi ho  
function Signup() {
  const router=useRouter();
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const submitHandler=async(e:any)=>{
    e.preventDefault();
    const response=await axios.post("/api/sign-up",
      {
        username,
        email,
        password
      }
    );
    if(response.data.success){
           router.push("/")
    }
  }
  return (
    <div>
      <section className="bg-neutral-950 dark:bg-dark py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex bg-neutral-950 flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] bg-neutral-900 rounded-lg shadow-sm-light shadow-blue-900 hover:shadow-blue-600 py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <a href="#" className="mx-auto inline-block max-w-[160px]">
                    <img
                      src="blog.png"
                      className="h-18 w-20 rounded-2xl"
                      alt="logo"
                    />
                  </a>
                </div>
                <form onSubmit={submitHandler} method="post">
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full px-5 py-3 outline-blue-800 hover:bg-slate-950 text-base bg-transparent border rounded-md border-stroke text-white focus:border-primary"
                      name="username"
                      value={username}
                      onChange={(e)=>{
                        setUsername(e.target.value);
                      }}

                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-5 py-3 outline-blue-800 hover:bg-slate-950 text-base bg-transparent border rounded-md border-stroke text-white focus:border-primary"
                      name="email"
                      value={email}//ku username nhi? ok i understand
                      onChange={(e)=>{
                        setEmail(e.target.value);
                      }}

                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      
                      placeholder="Password"
                      className="w-full px-5 py-3 outline-blue-800 hover:bg-slate-950 text-base bg-transparent border rounded-md border-stroke text-white focus:border-primary"
                      name="password"
                      value={password}//ku username nhi? ok i understand
                      onChange={(e)=>{
                        setPassword(e.target.value);
                      }}
                      
                    />
                  </div>
                 
                  <div className="mb-10">
                    <button
                      type="submit"
                      className="w-full px-5 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                      Register
                    </button>
                  </div>
                  
                </form>
                <p className="mb-6 text-base text-secondary-color">Connect With</p>
                <ul className="flex justify-between mb-12 -mx-2">
                  <li className="w-full px-2">
                    <a href="#" className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90">
                      Facebook
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a href="#" className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90">
                      Twitter
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a href="#" className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90">
                      Google
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
