import { Router } from "express";
import ordersRoutes from "./routers/ordersRoutes";
import productsRoutes from "./routers/productsRoutes";
import categoriesRoutes from './routers/categoriesRoutes';
import orderItemsRoutes from "./routers/orderItemsRoutes";
//ejemplo: import orderItemsRoutes from './routers/orderItemRoutes'

const router = Router();

// importar routers de cada uno
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/orderItems", orderItemsRoutes);
router.use("/orders", ordersRoutes);

//ejemplo: router.use("orderItems", orderItemsRoutes);

export default router;