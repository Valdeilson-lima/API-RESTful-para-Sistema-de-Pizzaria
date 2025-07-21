"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // Validate input
            if (!email || !password) {
                throw new Error("Preencha todos os campos");
            }
            // Check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Formato de Email inválido");
            }
            // Check if user exists
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new Error("Usuário ou senha incorretos");
            }
            // Compare password
            const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("Usuário ou senha incorretos");
            }
            // Generate JWT token
            const token = (0, jsonwebtoken_1.sign)({
                user: {
                    name: user.name,
                    email: user.email,
                },
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: "1d",
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
