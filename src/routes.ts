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

// Controllers Order
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

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

// Order Routes
router.post("/order/create", isAuthenticated, new CreateOrderController().handle);
router.delete("/order/remove", isAuthenticated, new RemoveOrderController().handle);
router.post("/order/add-item", isAuthenticated, new AddItemController().handle);
router.delete("/order/remove-item", isAuthenticated, new RemoveItemController().handle);
router.put("/order/send", isAuthenticated, new SendOrderController().handle);
router.get("/orders/list", isAuthenticated, new ListOrdersController().handle);
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle);
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle);




export default router;
