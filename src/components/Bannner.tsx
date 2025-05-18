import React from 'react'

function Bannner() {
  return (
    <>
    <div className="grid md:grid-cols-3 gap-6 min-h-[164px] py-8 p-16 bg-gradient-to-r from-blue-700 to-blue-400 overflow-hidden">
    <div className="md:col-span-2">
      <h1 className="text-3xl font-bold text-white">Welcome to Competition Preparation</h1>
      <p className="text-base text-gray-200 mt-4">A journey of hard work, focus, and determination begins here. Let’s sharpen our skills, stay committed, and aim for success. Every step counts — let’s give it our best!</p>

      <button type="button"
        className="py-3 px-6 text-sm font-semibold bg-white text-blue-600 hover:bg-slate-100 rounded-md mt-8">Get
        Started</button>
    </div>

    <div className="relative max-md:hidden">
      <img src="https://media.istockphoto.com/id/2157176253/photo/quality-assurance-and-document-control-with-checklist-icons-businessman-mark-off-items-on.jpg?s=612x612&w=0&k=20&c=n9oG8gKFEPEUv74GWOgtZnLiAbrMrWD0zTudrvJC8No=" alt="Banner Image"
        className="w-full right-4 top-[-13px] md:absolute skew-x-[-16deg] rotate-2 object-cover" />
    </div>
  </div>
      
    </>
  )
}

export default Bannner
