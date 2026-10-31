import { Request, Response } from "express";
import { products, Product, NewProduct } from "../data/products";

// 1. Listar todos los productos
export const getProducts = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: products
  });
};

// 2. Buscar un producto por ID
export const getProductById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Producto no encontrado"
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: product
  });
};

// 3. Crear un producto
export const createProduct = (req: Request, res: Response) => {
  const newProduct: NewProduct = req.body;

  if (
    !newProduct.name ||
    typeof newProduct.price !== "number" ||
    newProduct.price <= 0 ||
    !Number.isInteger(newProduct.stock) ||
    newProduct.stock < 0 ||
    !Number.isInteger(newProduct.categoryId) ||
    newProduct.categoryId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Los datos del producto no son válidos"
    });
    return;
  }

  let newId = 1;

if (products.length > 0) {
  const lastProduct = products[products.length - 1];

  if (lastProduct) {
    newId = lastProduct.id + 1;
  }
};

  const product: Product = {
    id: newId,
    ...newProduct
  };

  products.push(product);

  res.status(201).json({
    success: true,
    message: "Producto creado correctamente",
    data: product
  });
};

// 4. Actualizar un producto
export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Producto no encontrado"
    });
    return;
  }

  const updatedProduct: NewProduct = req.body;

  if (
    !updatedProduct.name ||
    typeof updatedProduct.price !== "number" ||
    updatedProduct.price <= 0 ||
    !Number.isInteger(updatedProduct.stock) ||
    updatedProduct.stock < 0 ||
    !Number.isInteger(updatedProduct.categoryId) ||
    updatedProduct.categoryId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Los datos del producto no son válidos"
    });
    return;
  }

  product.name = updatedProduct.name;
  product.price = updatedProduct.price;
  product.stock = updatedProduct.stock;
  product.categoryId = updatedProduct.categoryId;

  res.status(200).json({
    success: true,
    message: "Producto actualizado correctamente",
    data: product
  });
};

// 5. Eliminar un producto
export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({
      success: false,
      message: "Producto no encontrado"
    });
    return;
  }

  products.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Producto eliminado correctamente"
  });
};