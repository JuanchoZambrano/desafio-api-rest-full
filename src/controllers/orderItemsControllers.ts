import type { Response, Request } from "express";
import { type OrderItem, orderItems } from "../data/orderItems";

export function orderItemList(req: Request, res: Response) {
  /* 
    #swagger.tags = ['Order Items']
    #swagger.description = 'Endpoint para obtener todos los Order Items'
  */

  res.status(200).json({
    ok: true,
    mensaje: "Lista de Order Items",
    data: orderItems,
  });
}

export function orderItemById(req: Request, res: Response) {
  /* #swagger.tags = ['Order Items'] 
    #swagger.description = 'Endpoint para obtener una order item en especifico por su ID'
    #swagger.parameters['id'] = {
      description: 'ID de postgresql o identificador único del order item',
      type: 'string',
      required: true,
      example: '12'
    }
  */

  const requestedId = Number(req.params.id);
  const findingOrderItem = orderItems.find((o) => o.id === requestedId);

  if (!findingOrderItem) {
    return res.status(404).json({
      ok: false,
      mensaje: `No es encontró un una order item de ID: ${requestedId}`,
    });
  }

  return res.status(200).json({
    ok: true,
    data: findingOrderItem,
  });
}

export function createOrderItem(req: Request, res: Response) {
  /*
    #swagger.tags = ['Order Items'] 
    #swagger.description = 'Endpoint para crear una nueva Order Item'
    #swagger.parameters['nuevoOrderItem'] = {
      in: 'body',
      description: 'Información de la order item',
      required: true,
      schema: {
        orderId: 1,
        productId: 1,
        quantity: 2,
        subtotal: 12.99,
      }
    }
      #swagger.security = [{
      "ApiKeyAuth": []
    }] */

  const { orderId, productId, quantity, subtotal } = req.body;
  const ultimoId = orderItems.length > 0 ? Math.max(...orderItems.map(o => o.id)) : 0;
  const nuevoId = ultimoId + 1;

  let nuevoOrderItem: OrderItem = {
    id: nuevoId,
    orderId,
    productId,
    quantity,
    subtotal,
  };

  orderItems.push(nuevoOrderItem);
  res.status(201).json({
    ok: true,
    mensaje: `Se ha creado el order item exitosamente.`,
    estudiante: nuevoOrderItem,
  });
}

export function updateOrderItem(req: Request, res: Response) {

  /* #swagger.tags = ['Order Items'] 
  #swagger.description = 'Endpoint para actualizar datos de un order item existente'

  #swagger.security = [{
      "ApiKeyAuth": []
    }]*/

  const { id } = req.params;
  const { orderId, productId, quantity, subtotal } = req.body;

  const orderItem = orderItems.find((o) => o.id === Number(id));

  if (!orderItem) {
    return res.status(404).json({ ok: false, mensaje: "Order Item no encontrado" });
  }

  if (orderId) orderItem.orderId = Number(orderId);
  if (productId) orderItem.productId = Number(productId);
  if (quantity !== undefined) orderItem.quantity = Number(quantity);
  if (subtotal !== undefined) orderItem.subtotal = Number(subtotal);

  return res.status(200).json({
    ok: true,
    mensaje: "Order Item actualizado con éxito",
    data: orderItem,
  });
}

export function deleteOrderItem(req: Request, res: Response) {

  /* #swagger.tags = ['Order Items'] 
  #swagger.description = 'Endpoint para eliminar de manera fisica un order item por su ID'
  #swagger.security = [{
      "ApiKeyAuth": []
    }]
  */

  const findingId = Number(req.params.id);
  const foundOrderItem = orderItems.findIndex((o) => o.id === findingId);

  if (foundOrderItem === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `Order Item con ID: ${findingId} no encontrado.`,
    });
  }

  orderItems.splice(foundOrderItem, 1);

  res.status(200).json({
    ok: true,
    mensaje: `Order Item de ID: ${findingId} eliminado con exito.`,
  });
}