import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Middleware
import { isAuthenticated } from "./middlewares/isauthenticated";

const router = Router();

// User Routes
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/user/detail", isAuthenticated, new DetailUserController().handle);

export default router;
