// models/Profile.ts

import mongoose from "mongoose"

// Define o esquema do Mongoose com base na interface
const profileSchema = new mongoose.Schema({
  
  name:{ 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  skills: { 
    type: String, 
    required: false 
  },
  education: { 
    type: String, 
    required: true 
  },
  certifications: { 
    type: String, 
    required: false 
  },
 
  github: { 
    type: String, 
    required: false 
  },
  linkedin: { 
    type: String, 
    required: false 
  },
  
  image: { 
    type: String, 
    required: false
   },

   userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  }

})

export const ProfileModel = mongoose.model("Profile", profileSchema)
