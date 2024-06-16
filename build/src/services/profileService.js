"use strict";
// services/profileService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const Profile_1 = require("../models/Profile");
;
;
class ProfileService {
    //-----------------------------------------------------------------------------------------------//
    async createProfile(profileData) {
        try {
            const profile = new Profile_1.ProfileModel(profileData);
            const result = await profile.save();
            return { message: "OK", result };
        }
        catch (error) {
            return { message: error.message || "Unknown error" };
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async getAllProfiles(offset, pageSize) {
        try {
            const profiles = await Profile_1.ProfileModel.find({}, { _id: 0, userId: 0 })
                .skip(offset)
                .limit(pageSize)
                .exec();
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //-----------------------------------------------------------------------------------------------//
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
    //-----------------------------------------------------------------------------------------------//
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
    //-----------------------------------------------------------------------------------------------//
    async deleteProfileByUserId(userId) {
        try {
            const profile = await Profile_1.ProfileModel.findOneAndDelete({ userId });
            return profile;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async getProfileFields() {
        try {
            const profiles = await Profile_1.ProfileModel.find().select("username description skills education certifications contact image userId -_id");
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async queryProfiles() {
        try {
            const profiles = await Profile_1.ProfileModel.find().select("username description skills education certifications contact image userId -_id").populate("userId", "username email -_id");
            return profiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async getTotalProfiles() {
        try {
            const totalProfiles = await Profile_1.ProfileModel.countDocuments().exec();
            return totalProfiles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async searchProfiles(params) {
        const { name, certifications, education, skills, page = 1, limit = 10 } = params;
        const query = {};
        if (name)
            query.name = { $regex: new RegExp(name, 'i') };
        if (certifications)
            query.certifications = certifications;
        if (education)
            query.graduation = { $regex: new RegExp(education, 'i') };
        if (skills)
            query.skills;
        try {
            const candidatos = await Profile_1.ProfileModel.find(query)
                .skip((page - 1) * limit)
                .limit(limit);
            const total = await Profile_1.ProfileModel.countDocuments(query);
            return {
                candidatos,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw new Error(`Erro ao buscar perfis: ${error.message}`);
        }
    }
    ;
}
exports.ProfileService = ProfileService;
