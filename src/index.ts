import { Router } from "express";
import productsRoutes from "./routers/productsRoutes";
import categoriesRoutes from './routers/categoriesRoutes';
import orderItemsRoutes from "./routers/orderItemsRoutes";
//ejemplo: import orderItemsRoutes from './routers/orderItemRoutes'

const router = Router();

// importar routers de cada uno
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/orderItems", orderItemsRoutes);
//ejemplo: router.use("orderItems", orderItemsRoutes);

export default router;