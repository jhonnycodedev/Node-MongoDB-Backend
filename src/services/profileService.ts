// services/profileService.ts

import { ProfileModel } from "../models/Profile";

interface ProfileData {
  id: string;
  name?: string;
  description?: string;
  skills?: string;
  education?: string;
  certifications?: string;
  github?: string;
  linkedin?: string;
  image?: string;
  userId: string;
}


export class ProfileService {

  public async createProfile(profileData: ProfileData) {
    
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


  public async updateProfile(profileData: ProfileData){

    try {
      const updateData: Partial<Omit<ProfileData, 'id'>> = {};
    
    (Object.keys(profileData) as (keyof ProfileData)[]).forEach((key) => {
      if (profileData[key] !== undefined && key !== 'id') {
        updateData[key] = profileData[key];
      }
    });

    const result = await ProfileModel.findByIdAndUpdate(profileData.id, updateData, { new: true });

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
  }

  public async deleteProfileByUserId(userId: string) {
    try {
      const profile = await ProfileModel.findOneAndDelete({ userId });
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
