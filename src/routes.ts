import { Router, Request, Response } from "express";
import multer from "multer";

// Controllers User
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Middleware
import { isAuthenticated } from "./middlewares/isauthenticated";
import  uploadConfig  from "./config/multer";


// Controllers Category
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

// Controllers Product
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// User Routes
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/user/detail", isAuthenticated, new DetailUserController().handle);


// Category Routes
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/category/list", isAuthenticated, new ListCategoryController().handle);

// Product Routes
router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get("/category/products", isAuthenticated, new ListByCategoryController().handle);



export default router;
