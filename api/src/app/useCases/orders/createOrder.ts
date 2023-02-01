import { Request, Response } from 'express';
import { io } from '../../..';
import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;
    const order = await Order.create({ table, products });
    const orderDetails = await order.populate('products.product');

    io.emit('new@order', orderDetails);

    return res.status(201).json(order);
  } catch (error) {
    return res.sendStatus(500);
  }
}
