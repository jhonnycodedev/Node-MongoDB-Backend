"use strict";
// controllers/profileController.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const profileService_1 = require("../services/profileService");
let ProfileController = class ProfileController {
    constructor() {
        this.profileService = new profileService_1.ProfileService();
    }
    async create(body, req // Adicione o decorator @Request para obter acesso ao objeto de requisição
    ) {
        try {
            const userId = req.user.id; // Obtenha o ID do usuário decodificado do token
            const profileData = Object.assign(Object.assign({}, body), { userId }); // Adicione o userId aos dados do perfil
            const result = await this.profileService.createProfile(profileData);
            return result; // Retorna o resultado da criação do perfil
        }
        catch (error) {
            return { message: error.message || "Unknown error" }; // Retorna uma mensagem de erro em caso de falha
        }
    }
    async all() {
        try {
            const profiles = await this.profileService.getAllProfiles();
            return profiles;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async findById(id) {
        try {
            const user = await this.profileService.findProfileByUserId(id);
            return { user: user };
        }
        catch (error) {
            return {
                error: error.message
            };
        }
    }
    async update(body) {
        try {
            const result = await this.profileService.updateProfile(body);
            return { result: result };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const profile = await this.profileService.deleteProfile(id);
            return { data: profile };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async fields() {
        try {
            const profiles = await this.profileService.getProfileFields();
            return profiles;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async query() {
        try {
            const profiles = await this.profileService.queryProfiles();
            return profiles;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
};
__decorate([
    (0, tsoa_1.Post)("/create"),
    (0, tsoa_1.Security)("bearerAuth"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProfileController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)("/getAll"),
    (0, tsoa_1.Security)("bearerAuth"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProfileController.prototype, "all", null);
__decorate([
    (0, tsoa_1.Get)("/findById/{id}"),
    (0, tsoa_1.Security)("bearerAuth"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProfileController.prototype, "findById", null);
__decorate([
    (0, tsoa_1.Patch)("/update"),
    (0, tsoa_1.Security)("bearerAuth"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProfileController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)("/delete/:id"),
    (0, tsoa_1.Security)("bearerAuth"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProfileController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)("/fields"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProfileController.prototype, "fields", null);
__decorate([
    (0, tsoa_1.Get)("/query"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProfileController.prototype, "query", null);
ProfileController = __decorate([
    (0, tsoa_1.Route)("api/profiles"),
    __metadata("design:paramtypes", [])
], ProfileController);
exports.default = ProfileController;
