import { Router } from "express";
/* 
derlyz
mike
roberto
ivan
juan
*/

//ejemplo: import orderItemsRoutes from './routers/orderItemRoutes'
import categoriesRoutes from './routers/categoriesRoutes'

const router = Router();

// importar routers de cada uno
/* 
derlyz
mike
roberto
ivan
juan
*/

//ejemplo: router.use("orderItems", orderItemsRoutes);
router.use("/categories", categoriesRoutes);
export default router;