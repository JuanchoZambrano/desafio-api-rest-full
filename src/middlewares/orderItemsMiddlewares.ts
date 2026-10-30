import { Request, Response, NextFunction } from "express";
import { AppError } from "./error-handlers";
export function validateOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { userId, totalAmount, status } = req.body;
    if (!Number.isInteger(userId) || userId <= 0) {
        return next(new AppError(400, "El userId debe ser un numero positivo"));
    }
    if (typeof totalAmount !== "number" || totalAmount <= 0) {
        return next(new AppError(400, "El totalAmount debe ser mayor a cero"));
    }
    if (
        status !== undefined &&
        status !== "pendiente" &&
        status !== "completada"
    ) {
        return next(new AppError(400, "Estado de orden no valido"));
    }
    next();
}
export function validateOrderUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { userId, totalAmount, status } = req.body;
    if (Object.keys(req.body).length === 0) {
        return next(new AppError(400, "Debe enviar datos para actualizar"));
    }
    if (
        userId !== undefined &&
        (!Number.isInteger(userId) || userId <= 0)
    ) {
        return next(new AppError(400, "El userId debe ser un numero positivo"));
    }
    if (
        totalAmount !== undefined &&
        (typeof totalAmount !== "number" || totalAmount <= 0)
    ) {
        return next(new AppError(400, "El totalAmount debe ser mayor a cero"));
    }
    if (
        status !== undefined &&
        status !== "pendiente" &&
        status !== "completada"
    ) {
        return next(new AppError(400, "Estado de orden no valido"));
    }
    next();
}