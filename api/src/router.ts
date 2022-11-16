import { Router } from 'express';
import { createCategories } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';


export const router = Router();

// List category
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategories);

// List products
router.get('/products', (req, res) => {
  res.send('Products!');
});

// Create product
router.post('/products', (req, res) => {
  res.send('Products!');
});

// Get products by category
router.post('/categories/:categorieId/products', (req, res) => {
  res.send('Orders!');
});

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
