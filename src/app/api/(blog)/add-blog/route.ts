import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function POST(request: NextRequest) {
  await connectDB();
  
  try {
    const { title, content, imageUrl, contentType } = await request.json();
    
    // Basic validation
    if (!title || !content) {
      return NextResponse.json(
        {
          message: "Title and content are required",
          success: false,
        },
        { status: 400 }
      );
    }
    
    // Create new blog post with updated schema fields
    const newIdea = new Idea({
      title,
      content,
      contentType: contentType || 'html', // Default to html if not specified
      imageUrl, // Use imageUrl directly now
    });
    
    await newIdea.save();
    
    return NextResponse.json(
      {
        message: "Blog created successfully!",
        success: true,
        data: newIdea,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Blog creation failed",
        success: false,
      },
      { status: 500 }
    );
  }
}