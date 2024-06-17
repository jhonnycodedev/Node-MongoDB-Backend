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
};

export class ProfileService {

//-----------------------------------------------------------------------------------------------//

  public async createProfile(profileData: ProfileData) {
    try {
      const profile = new ProfileModel(profileData);
      const result = await profile.save();
      return { message: "OK", result };
    } catch (error: any) {
      return { message: error.message || "Unknown error" };
    }
  }

//-----------------------------------------------------------------------------------------------//

  public async getAllProfiles(offset: number, pageSize: number): Promise<any[]> {
    try {
      const profiles = await ProfileModel.find({}, { _id: 0, userId: 0 })
                                         .skip(offset)
                                         .limit(pageSize)
                                         .exec();
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

//-----------------------------------------------------------------------------------------------//

  public async findProfileByUserId(userId: string) {
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

//-----------------------------------------------------------------------------------------------//

  public async updateProfile(profileData: ProfileData) {
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

//-----------------------------------------------------------------------------------------------//

  public async deleteProfileByUserId(userId: string) {
    try {
      const profile = await ProfileModel.findOneAndDelete({ userId });
      return profile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

//-----------------------------------------------------------------------------------------------//

  public async getProfileFields() {
    try {
      const profiles = await ProfileModel.find().select("name description skills education certifications github linkedin image userId -_id");
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

//-----------------------------------------------------------------------------------------------//
  public async queryProfiles() {
    try {
      const profiles = await ProfileModel.find().select("name description skills education certifications github linkedin image userId -_id").populate("userId", "username email -_id");
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

//-----------------------------------------------------------------------------------------------//

  public async getTotalProfiles(): Promise<number> {
    try {
      const totalProfiles = await ProfileModel.countDocuments().exec();
      return totalProfiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

//-----------------------------------------------------------------------------------------------//


public async searchProfiles(keyword: string, page: number = 1, pageSize: number = 10) {
  try {
    const skip = (page - 1) * pageSize;
    const profiles = await ProfileModel.find({ 
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { skills: { $regex: keyword, $options: 'i' } },
        { education: { $regex: keyword, $options: 'i' } },
        { certifications: { $regex: keyword, $options: 'i' } },
      ]
    },{ _id: 0, userId: 0 })
    .skip(skip)
    .limit(pageSize);
    
    return profiles;
  } catch (error: any) {
    throw new Error(error.message);
  }
}



//-----------------------------------------------------------------------------------------------//

}
