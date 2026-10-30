import { Router } from "express";
/* 
derlyz
mike
roberto*/ import ordersRoutes from "./routers/ordersRoutes";
/*
ivan
juan
*/

//ejemplo: import orderItemsRoutes from './routers/orderItemRoutes'

const router = Router();

// importar routers de cada uno
/* 
derlyz
mike
roberto */ router.use("/orders", ordersRoutes);
/*ivan
juan
*/

//ejemplo: router.use("orderItems", orderItemsRoutes);

export default router;