// services/profileService.ts

import { ProfileModel } from "../models/Profile";

export class ProfileService {


  public async createProfile(profileData: {
    userId: string;
    username:string;
    description: string;
    skills ?: string;
    education: string;
    certifications ?: string;
    github: string; 
    linkedin: string ;
    image?: string;
  }): Promise<{ message: string; result?: any }> { // Ajuste o tipo de retorno
    try {
      const profile = new ProfileModel(profileData);
      const result = await profile.save();
      
      return { message: "OK", result };
    } catch (error: any) { // Especifica o tipo do erro como Error
      return { message: error.message || "Unknown error" };
    }
  }
  

  public async getAllProfiles() {
    try {
      const profiles = await ProfileModel.find();
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findProfileByUserId(userId: string) {
    try {
      const profile = await ProfileModel.findOne({ userId });
      if (!profile) {
        throw new Error("Profile not found");
      }
      return profile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


  public async updateProfile(profileData: {
    id: string;
    username?:string;
    description?: string;
    skills?: string;
    education?: string;
    certifications?: string;
    github?: string;
    linkedin?: string;
    image?: string;
    userId?: string;
  }) {
    try {
      const result = await ProfileModel.findByIdAndUpdate(profileData.id, {
        userId: profileData.userId,
        username: profileData.username,
        description: profileData.description,
        skills: profileData.skills,
        education: profileData.education,
        certifications: profileData.certifications,
        github: profileData.github,
        linkedin: profileData.linkedin,
        image: profileData.image,
        
      }, { new: true });

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteProfile(id: string) {
    try {
      const profile = await ProfileModel.findByIdAndDelete(id);
      return profile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getProfileFields() {
    try {
      const profiles = await ProfileModel.find().select("username description skills education certifications contact image userId -_id");
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async queryProfiles() {
    try {
      const profiles = await ProfileModel.find().select("username description skills education certifications contact image userId -_id").populate("userId", "username email -_id");
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
