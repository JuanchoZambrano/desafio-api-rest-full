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
