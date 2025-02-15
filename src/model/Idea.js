// ab hum banayenge ek model 
//  matlb database 
// database banane me meri madad karega mongoose 
// schema means - dhacha 
import mongoose from "mongoose";

const idea = new mongoose.Schema({

    title: {

        type: String,

        required: true,

    },

    description: {

        type: String,

        required: true,

    },

    

});

const Idea = mongoose.models.Idea || mongoose.model("Idea", idea);

export default Idea; 