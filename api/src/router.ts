import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createCategories } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { deleteProduct } from './app/useCases/products/deleteProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List category
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategories);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Delete product
router.delete('/products/:produtId', deleteProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.post('/orders', (req, res) => {
  res.send('Orders!');
});

// Create order
router.post('/orders', (req, res) => {
  res.send('Orders!');
});

// Change order status
router.patch('/orders/:orderId', (req, res) => {
  res.send('Orders!');
});

// Delete/Cancell order
router.delete('/orders/:orderId', (req, res) => {
  res.send('Orders!');
});
