// models/Profile.ts

import mongoose from "mongoose"

// Define o esquema do Mongoose com base na interface
const profileSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  skills: { 
    type: [String], 
    required: true 
  },
  education: { 
    type: [String], 
    required: true 
  },
  certifications: { 
    type: [String], 
    required: true 
  },
  contact: {
    github: { 
      type: String, 
      required: true 
    },
    linkedin: { 
      type: String, 
      required: true 
    },
  },
  image: { 
    type: String, 
    required: true
   },

   userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  }

})

export const ProfileModel = mongoose.model("Profile", profileSchema)
