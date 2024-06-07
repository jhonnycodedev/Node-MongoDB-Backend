"use strict";
// services/profileService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const Profile_1 = require("../models/Profile");
class ProfileService {
    async createProfile(profileData) {
        try {
            const profile = new Profile_1.ProfileModel(profileData);
            const result = await profile.save();
            return { message: "OK", result };
        }
        catch (error) { // Especifica o tipo do erro como Error
            return { message: error.message || "Unknown error" };
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
    async findProfileByUserId(userId) {
        try {
            const profile = await Profile_1.ProfileModel.findOne({ userId });
            if (!profile) {
                throw new Error("Profile not found");
            }
            return profile;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateProfile(profileData) {
        try {
            const updateData = {};
            Object.keys(profileData).forEach((key) => {
                if (profileData[key] !== undefined && key !== 'id') {
                    updateData[key] = profileData[key];
                }
            });
            const result = await Profile_1.ProfileModel.findByIdAndUpdate(profileData.id, updateData, { new: true });
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
            const profiles = await Profile_1.ProfileModel.find().select("username description skills education certifications contact image userId -_id");
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async queryProfiles() {
        try {
            const profiles = await Profile_1.ProfileModel.find().select("username description skills education certifications contact image userId -_id").populate("userId", "username email -_id");
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ProfileService = ProfileService;
