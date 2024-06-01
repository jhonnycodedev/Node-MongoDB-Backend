"use strict";
// services/profileService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const Profile_1 = require("../models/Profile");
class ProfileService {
    async createProfile(profileData) {
        const profile = new Profile_1.ProfileModel(profileData);
        try {
            await profile.save();
            return "OK";
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async getAllProfiles() {
        try {
            const profiles = await Profile_1.ProfileModel.find();
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findProfileById(id) {
        try {
            const user = await Profile_1.ProfileModel.findById(id);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateProfile(profileData) {
        try {
            const result = await Profile_1.ProfileModel.findByIdAndUpdate(profileData.id, {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteProfile(id) {
        try {
            const profile = await Profile_1.ProfileModel.findByIdAndDelete(id);
            return profile;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getProfileFields() {
        try {
            const profiles = await Profile_1.ProfileModel.find().select("name description skills education certifications contact image userId -_id");
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async queryProfiles() {
        try {
            const profiles = await Profile_1.ProfileModel.find().select("name description skills education certifications contact image userId -_id").populate("userId", "username email -_id");
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ProfileService = ProfileService;
