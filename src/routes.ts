import { Router, Request, Response } from "express";

// Controllers User
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Middleware
import { isAuthenticated } from "./middlewares/isauthenticated";

// Controllers Category
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

// User Routes
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/user/detail", isAuthenticated, new DetailUserController().handle);


// Category Routes
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/category/list", isAuthenticated, new ListCategoryController().handle);


export default router;
