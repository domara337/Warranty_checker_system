import { Router } from "express";
import {
  getAllProducts,
  getProductBybrand,
  getByPartNumber,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/products.controller.ts"; // Adjust path to your controller file

const router = Router();

// 1. Specific/Query routes MUST come before parameterized /:id routes
// GET /api/products
router.get("/", getAllProducts);

// GET /api/products/brand?brand=hp
router.get("/brand", getProductBybrand);

// GET /api/products/part/:partNumber
router.get("/part/:partNumber", getByPartNumber);

// 2. Generic dynamic ID parameter routes
// GET /api/products/:id
router.get("/:id", getProduct);

// POST /api/products
router.post("/", addProduct);

// PUT /api/products/:id
router.put("/:id", editProduct);

// DELETE /api/products/:id
router.delete("/:id", removeProduct);

export default router;