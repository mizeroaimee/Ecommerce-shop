import {
  Order,
  OrderDetails,
  OrderStatus,
  Currency
} from "../types/index.js";
import { ShoppingCart } from "./ShoppingCart.js";

export class OrderManager {
  private orders: Map<string, Order>;
  private orderIdCounter: number;

  constructor() {
    this.orders = new Map();
    this.orderIdCounter = 1;
  }

  /**
   * Generate a unique order ID
   * @returns Order ID
   */
  private generateOrderId(): string {
    const id = `ORDER-${Date.now()}-${this.orderIdCounter}`;
    this.orderIdCounter++;
    return id;
  }

  /**
   * Create an order from cart
   * @param cart - Shopping cart instance
   * @param currency - Currency for the order
   * @param taxRate - Tax rate to apply
   * @returns Created order
   */
  createOrder(
    cart: ShoppingCart,
    currency: Currency = "USD",
    taxRate: number = 0
  ): Order {
    if (cart.isEmpty) {
      throw new Error("Cannot create order from empty cart");
    }

    const items = cart.getItems();
    const subtotal = cart.getSubtotal();
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    const orderDetails: OrderDetails = {
      items: items.map((item) => ({
        dessert: { ...item.dessert },
        quantity: item.quantity,
        addedAt: new Date(item.addedAt)
      })),
      subtotal,
      tax,
      total,
      currency
    };

    const order: Order = {
      id: this.generateOrderId(),
      details: orderDetails,
      status: "pending",
      createdAt: new Date()
    };

    this.orders.set(order.id, order);
    return order;
  }

  confirmOrder(orderId: string): Order {
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "pending") {
      throw new Error(`Cannot confirm order with status: ${order.status}`);
    }

    const updatedOrder: Order = {
      ...order,
      status: "confirmed",
      confirmedAt: new Date()
    };

    this.orders.set(orderId, updatedOrder);
    return updatedOrder;
  }

  /**
   * Cancel an order
   * @param orderId - ID of order to cancel
   * @returns Updated order
   */
  cancelOrder(orderId: string): Order {
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === "completed") {
      throw new Error("Cannot cancel completed order");
    }

    const updatedOrder: Order = {
      ...order,
      status: "cancelled"
    };

    this.orders.set(orderId, updatedOrder);
    return updatedOrder;
  }

  /**
   * Complete an order
   * @param orderId - ID of order to complete
   * @returns Updated order
   */
  completeOrder(orderId: string): Order {
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "confirmed") {
      throw new Error("Only confirmed orders can be completed");
    }

    const updatedOrder: Order = {
      ...order,
      status: "completed"
    };

    this.orders.set(orderId, updatedOrder);
    return updatedOrder;
  }

  /**
   * Get an order by ID
   * @param orderId - ID of order to retrieve
   * @returns Order or undefined
   */
  getOrder(orderId: string): Order | undefined {
    return this.orders.get(orderId);
  }

 
  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  
  getOrdersByStatus(status: OrderStatus): Order[] {
    return Array.from(this.orders.values()).filter(
      (order) => order.status === status
    );
  }

  
  getTotalRevenue(): number {
    const completedOrders = this.getOrdersByStatus("completed");
    return completedOrders.reduce(
      (sum, order) => sum + order.details.total,
      0
    );
  }

  /**
   * Delete an order
   * @param orderId - ID of order to delete
   * @returns True if deleted, false if not found
   */
  deleteOrder(orderId: string): boolean {
    return this.orders.delete(orderId);
  }

  /**
   * Clear all orders
   */
  clearAllOrders(): void {
    this.orders.clear();
  }
}
