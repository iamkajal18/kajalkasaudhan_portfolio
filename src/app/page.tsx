"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";

import StudyPlan from "@/components/StudyPlan";
import Banner from "@/components/Bannner";
import RoadMap from "@/components/roadmaps/Main";
import PlacementPre from "@/components/PlacementPre";


// Define the Idea interface
interface Idea {
  _id: string;
  title: string;
  description: string;
  image:string;
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
    <Banner/>
    
    <StudyPlan/>
    <RoadMap/>
     <PlacementPre/>

   
     <div className="container mx-auto p-9">
  {/* ✅ Ideas Section */}
  <div className="flex justify-between items-center mb-12">
    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
      <span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
        Exploring
      </span>{" "}
      New Ideas
    </h3>

    <Link href="/create">
      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 rounded-md w-28 h-12 text-white mx-2 my-2 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
        Add New
      </button>
    </Link>
     
  </div>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {ideas.length > 0 ? (
      ideas.map((idea) => (
        <div
          key={idea._id}
          className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={idea.image}
            alt={idea.title}
            className="w-full h-48 rounded-t-lg object-cover mb-4"
          />

          <div className="p-4">
            <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {idea.title}
            </h5>
            <p className="mb-3 text-gray-700 dark:text-gray-400 line-clamp-3"dangerouslySetInnerHTML={{ __html: idea.description}} />
              
            

            <div className="flex items-center justify-between mt-4">
              {/* Read More Button */}
              <Link href={`/viewmore/${idea._id}`}>
                <button className="bg-gradient-to-r from-green-400 to-teal-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 rounded-md py-2 px-4 text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                  View More
                </button>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(idea._id)}
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 rounded-md py-2 px-4 text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 dark:text-gray-400">No ideas available</p>
    )}
  </div>

  {/* Testimonials and FAQ Sections */}
  <Testimonial />
  <Faq />
</div>

    </>
  );
}
