import { Request, Response, NextFunction } from "express";
import { orders, Order } from "../data/orders";
import { AppError } from "../middlewares/error-handlers";
export function getOrders(req: Request, res: Response) {
    res.status(200).json({
        success: true,
        data: orders
    });
}
export function getOrderById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);
    if (!order) {
        return next(new AppError(404, "Orden no encontrada"));
    }
    res.status(200).json({
        success: true,
        data: order
    });
}
export function createOrder(req: Request, res: Response) {
    const newOrder: Order = {
        id: orders.length > 0
            ? Math.max(...orders.map((order) => order.id)) + 1
            : 1,
        userId: req.body.userId,
        totalAmount: req.body.totalAmount,
        status: req.body.status || "pendiente",
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    res.status(201).json({
        success: true,
        message: "Orden creada correctamente",
        data: newOrder
    });
}
export function updateOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);
    if (!order) {
        return next(new AppError(404, "Orden no encontrada"));
    }
    const { userId, totalAmount, status } = req.body;
    if (userId !== undefined) order.userId = userId;
    if (totalAmount !== undefined) order.totalAmount = totalAmount;
    if (status !== undefined) order.status = status;
    res.status(200).json({
        success: true,
        message: "Orden actualizada correctamente",
        data: order
    });
}
export function deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const index = orders.findIndex((order) => order.id === id);
    if (index === -1) {
        return next(new AppError(404, "Orden no encontrada"));
    }
    orders.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "Orden eliminada correctamente"
    });
}