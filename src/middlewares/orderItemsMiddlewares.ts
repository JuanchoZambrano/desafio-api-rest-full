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
import type { Request, Response, NextFunction } from "express";

export function validarApiKey(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const apiKeyHeader = req.headers["x-api-key"];
  const apiKeyCursos = process.env.API_KEY; // || orderItemsjuan2026

  if (!apiKeyHeader || apiKeyHeader !== apiKeyCursos) {
    res.status(401).json({
      error: "Acceso no autorizado. Se requiere una clave valida.",
    });
    return;
  }

  next();
}

export function middlewareOrderItems(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { orderId, productId, quantity, subtotal } = req.body;

  if (
    orderId === undefined ||
    orderId === "" ||
    productId === undefined ||
    productId === "" ||
    quantity === undefined ||
    quantity === "" ||
    subtotal === undefined ||
    subtotal === ""
  ) {
    res.status(400).json({
      ok: false,
      mensaje: "Faltan campos obligatorios.",
    });
    return;
  }

  const numOrderId = Number(orderId);
  const numProductId = Number(productId);
  const numQuantity = Number(quantity);
  const numSubtotal = Number(subtotal);

  if (
    isNaN(numOrderId) ||
    numOrderId <= 0 ||
    isNaN(numProductId) ||
    numProductId <= 0 ||
    isNaN(numQuantity) ||
    numQuantity <= 0 ||
    isNaN(numSubtotal) ||
    numSubtotal <= 0
  ) {
    res.status(400).json({
      ok: false,
      mensaje:
        "Uno o más campos son inválidos. Todos los campos deben ser NUMÉRICOS y mayores a 0.",
    });
    return;
  }
  next();
}
