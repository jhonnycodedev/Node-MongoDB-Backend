// services/profileService.ts

import { ProfileModel } from "../models/Profile";

export class ProfileService {
  public async createProfile(profileData: {
    name: string;
    description: string;
    skills: string[];
    education: string[];
    certifications: string[];
    contact: { github: string; linkedin: string };
    image: string;
    userId: string;
  }): Promise<string> {
    const profile = new ProfileModel(profileData);

    try {
      await profile.save();
      return "OK";
    } catch (error) {
      return JSON.stringify(error);
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

  public async findProfileById(id: string) {
    try {
      const user = await ProfileModel.findById(id);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


  public async updateProfile(profileData: {
    id: string;
    name?: string;
    description?: string;
    skills?: string[];
    education?: string[];
    certifications?: string[];
    contact?: { github?: string; linkedin?: string };
    image?: string;
    userId?: string;
  }) {
    try {
      const result = await ProfileModel.findByIdAndUpdate(profileData.id, {
        name: profileData.name,
        description: profileData.description,
        skills: profileData.skills,
        education: profileData.education,
        certifications: profileData.certifications,
        contact: profileData.contact,
        image: profileData.image,
        userId: profileData.userId,
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
      const profiles = await ProfileModel.find().select("name description skills education certifications contact image userId -_id");
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async queryProfiles() {
    try {
      const profiles = await ProfileModel.find().select("name description skills education certifications contact image userId -_id").populate("userId", "username email -_id");
      return profiles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
