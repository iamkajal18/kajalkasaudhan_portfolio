import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function POST(request: NextRequest) {
    // waiting for the db connect 

    await connectDB();
    const {title ,description}= await request.json();
    console.log(title)
    // we have the data now we will store it in blog model 


    try {
        //frontedn se data aaya 
        //tumne bola databse me object create karta hai

        const idea = new Idea(
            {
                title,
                description
            }
        )
        // object create kar diya ab save kar dega 
       idea.save();
        return NextResponse.json(
            {
              message :"successfully created",
              success:true
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message:`${error}`,
                success:false
            }
        )
    }
    
} 