import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response) {
  try {
    const {orderId} = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({error: 'Order not found'});
    }

    await Order.remove(order);
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}
