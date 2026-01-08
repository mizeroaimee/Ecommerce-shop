export class OrderManager {
    constructor() {
        this.orders = new Map();
        this.orderIdCounter = 1;
    }
    /**
     * Generate a unique order ID
     * @returns Order ID
     */
    generateOrderId() {
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
    createOrder(cart, currency = "USD", taxRate = 0) {
        if (cart.isEmpty) {
            throw new Error("Cannot create order from empty cart");
        }
        const items = cart.getItems();
        const subtotal = cart.getSubtotal();
        const tax = Math.round(subtotal * taxRate * 100) / 100;
        const total = Math.round((subtotal + tax) * 100) / 100;
        const orderDetails = {
            items: items.map((item) => ({
                dessert: Object.assign({}, item.dessert),
                quantity: item.quantity,
                addedAt: new Date(item.addedAt)
            })),
            subtotal,
            tax,
            total,
            currency
        };
        const order = {
            id: this.generateOrderId(),
            details: orderDetails,
            status: "pending",
            createdAt: new Date()
        };
        this.orders.set(order.id, order);
        return order;
    }
    /**
     * Confirm an order
     * @param orderId - ID of order to confirm
     * @returns Updated order
     */
    confirmOrder(orderId) {
        const order = this.orders.get(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        if (order.status !== "pending") {
            throw new Error(`Cannot confirm order with status: ${order.status}`);
        }
        const updatedOrder = Object.assign(Object.assign({}, order), { status: "confirmed", confirmedAt: new Date() });
        this.orders.set(orderId, updatedOrder);
        return updatedOrder;
    }
    /**
     * Cancel an order
     * @param orderId - ID of order to cancel
     * @returns Updated order
     */
    cancelOrder(orderId) {
        const order = this.orders.get(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        if (order.status === "completed") {
            throw new Error("Cannot cancel completed order");
        }
        const updatedOrder = Object.assign(Object.assign({}, order), { status: "cancelled" });
        this.orders.set(orderId, updatedOrder);
        return updatedOrder;
    }
    /**
     * Complete an order
     * @param orderId - ID of order to complete
     * @returns Updated order
     */
    completeOrder(orderId) {
        const order = this.orders.get(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        if (order.status !== "confirmed") {
            throw new Error("Only confirmed orders can be completed");
        }
        const updatedOrder = Object.assign(Object.assign({}, order), { status: "completed" });
        this.orders.set(orderId, updatedOrder);
        return updatedOrder;
    }
    /**
     * Get an order by ID
     * @param orderId - ID of order to retrieve
     * @returns Order or undefined
     */
    getOrder(orderId) {
        return this.orders.get(orderId);
    }
    /**
     * Get all orders
     * @returns Array of all orders
     */
    getAllOrders() {
        return Array.from(this.orders.values());
    }
    /**
     * Get orders by status
     * @param status - Order status to filter by
     * @returns Array of orders with matching status
     */
    getOrdersByStatus(status) {
        return Array.from(this.orders.values()).filter((order) => order.status === status);
    }
    /**
     * Get total revenue from all completed orders
     * @returns Total revenue
     */
    getTotalRevenue() {
        const completedOrders = this.getOrdersByStatus("completed");
        return completedOrders.reduce((sum, order) => sum + order.details.total, 0);
    }
    /**
     * Delete an order
     * @param orderId - ID of order to delete
     * @returns True if deleted, false if not found
     */
    deleteOrder(orderId) {
        return this.orders.delete(orderId);
    }
    /**
     * Clear all orders
     */
    clearAllOrders() {
        this.orders.clear();
    }
}
