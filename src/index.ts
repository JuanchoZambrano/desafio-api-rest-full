import { Router } from "express";
/* 
derlyz
mike
roberto
ivan*/
import orderItemsRoutes from "./routers/orderItemsRoutes";

//ejemplo: import orderItemsRoutes from './routers/orderItemRoutes'
import categoriesRoutes from './routers/categoriesRoutes'

const router = Router();

// importar routers de cada uno

router.use("/categories", categoriesRoutes);
/*mike
roberto
ivan*/
router.use("/orderItems", orderItemsRoutes);

//ejemplo: router.use("orderItems", orderItemsRoutes);

export default router;