"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(request, response, next) {
    // Check if the user has a token
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({ error: "Token inválido" });
    }
    const parts = authToken.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return response.status(401).json({ error: "Token inválido" });
    }
    const [, token] = parts;
    try {
        // Verify if the token is valid
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Get user ID from the token
        request.userId = sub;
        // Call the next middleware or route handler
        return next();
    }
    catch (err) {
        return response.status(401).json({ error: "Token inválido" });
    }
}
