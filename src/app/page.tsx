"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";
import { Carousel } from "flowbite";
import Crousel from "@/components/Crousel";

// Define the Idea interface
interface Idea {
  _id: string;
  title: string;
  description: string;
}

export default function Page() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const fetchIdeas = async () => {
    try {
      const response = await axios.get("/api/get-idea");
      if (response.data.success) {
        setIdeas(response.data.ideas);
      } else {
        setIdeas([]);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };
  
  useEffect(() => {
    fetchIdeas();
  }, []);

  // ✅ Handle Idea Deletion
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/delete-blog/${id}`);
      if (response.data.success) {
        alert("Idea deleted successfully!");
        setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <>
    <Crousel/>
    
    <div className="container mx-auto p-9">
    
      {/* ✅ Ideas Section */}
      <h2 className="text-2xl font-bold mb-6 text-black">Ideas</h2>
      <div className="grid md:grid-cols-3 lg:grid-row-2 gap-4">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-6"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                {idea.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {idea.description}
              </p>
              <Link href="/create">
              <button className="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-3 text-white mx-2 my-2 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg will-change-transform transform hover:scale-105">
  Add New
</button>

              </Link>
              <Link href={`/edit/${idea._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-3 text-white mx-2 my-2 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg will-change-transform transform hover:scale-105">
  Edit
</button>

              </Link>
              <button
                onClick={() => handleDelete(idea._id)}
                className="bg-red-500 hover:bg-red-700 rounded-md py-2 px-3 text-white mx-2 my-2 text-sm font-semibold transition-all duration-150 shadow-md hover:shadow-lg will-change-transform transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No ideas available</p>
        )}
      </div>
      <Testimonial/>
      <Faq/>
      
    </div>
    </>
  );
}
