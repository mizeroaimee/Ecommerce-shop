import {
  CartItem,
  Dessert,
  DessertId,
  CartEvent,
  CartEventCallback
} from "../types/index.js";

export class ShoppingCart {
  private items: Map<DessertId, CartItem>;
  private subscribers: Set<CartEventCallback>;

  constructor() {
    this.items = new Map();
    this.subscribers = new Set();
  }

  /**
   * Subscribe to cart events
   * @param callback - Function to call on cart events
   * @returns Unsubscribe function
   */
  subscribe(callback: CartEventCallback): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Emit an event to all subscribers
   * @param event - Cart event to emit
   */
  private emit(event: CartEvent): void {
    this.subscribers.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in cart event callback:", error);
      }
    });
  }

  /**
   * Add an item to the cart
   * @param dessert - Dessert to add
   * @param quantity - Quantity to add (default: 1)
   */
  addItem(dessert: Dessert, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (!dessert.inStock) {
      throw new Error("Dessert is not in stock");
    }

    const existingItem = this.items.get(dessert.id);

    if (existingItem) {
      const updatedItem: CartItem = {
        ...existingItem,
        quantity: existingItem.quantity + quantity
      };
      this.items.set(dessert.id, updatedItem);
      this.emit({ type: "ITEM_ADDED", item: updatedItem });
    } else {
      const newItem: CartItem = {
        dessert,
        quantity,
        addedAt: new Date()
      };
      this.items.set(dessert.id, newItem);
      this.emit({ type: "ITEM_ADDED", item: newItem });
    }
  }

  /**
   * Remove an item from the cart
   * @param dessertId - ID of dessert to remove
   */
  removeItem(dessertId: DessertId): void {
    if (this.items.has(dessertId)) {
      this.items.delete(dessertId);
      this.emit({ type: "ITEM_REMOVED", dessertId });
    }
  }

  /**
   * Update quantity of a cart item
   * @param dessertId - ID of dessert to update
   * @param newQuantity - New quantity
   */
  updateQuantity(dessertId: DessertId, newQuantity: number): void {
    if (newQuantity < 0) {
      throw new Error("Quantity cannot be negative");
    }

    if (newQuantity === 0) {
      this.removeItem(dessertId);
      return;
    }

    const item = this.items.get(dessertId);
    if (!item) {
      throw new Error("Item not found in cart");
    }

    const updatedItem: CartItem = {
      ...item,
      quantity: newQuantity
    };

    this.items.set(dessertId, updatedItem);
    this.emit({
      type: "QUANTITY_UPDATED",
      dessertId,
      quantity: newQuantity
    });
  }

  /**
   * Increment item quantity
   * @param dessertId - ID of dessert to increment
   */
  incrementQuantity(dessertId: DessertId): void {
    const item = this.items.get(dessertId);
    if (!item) {
      throw new Error("Item not found in cart");
    }
    this.updateQuantity(dessertId, item.quantity + 1);
  }

  /**
   * Decrement item quantity
   * @param dessertId - ID of dessert to decrement
   */
  decrementQuantity(dessertId: DessertId): void {
    const item = this.items.get(dessertId);
    if (!item) {
      throw new Error("Item not found in cart");
    }
    this.updateQuantity(dessertId, Math.max(0, item.quantity - 1));
  }

  /**
   * Get cart total with optional tax
   * @param taxRate - Tax rate (default: 0)
   * @returns Total amount
   */
  getTotal(taxRate: number = 0): number {
    const subtotal = Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.dessert.price * item.quantity,
      0
    );

    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return Math.round(total * 100) / 100;
  }

  /**
   * Get subtotal (before tax)
   * @returns Subtotal amount
   */
  getSubtotal(): number {
    const subtotal = Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.dessert.price * item.quantity,
      0
    );
    return Math.round(subtotal * 100) / 100;
  }

  /**
   * Get total number of items in cart
   * @returns Total item count
   */
  getItemCount(): number {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  /**
   * Get all cart items as an array
   * @returns Array of cart items
   */
  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Clear all items from cart
   */
  clear(): void {
    this.items.clear();
    this.emit({ type: "CART_CLEARED" });
  }

  /**
   * Check if cart is empty
   * @returns True if cart is empty
   */
  get isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * Check if cart has a specific item
   * @param dessertId - ID to check
   * @returns True if item exists
   */
  hasItem(dessertId: DessertId): boolean {
    return this.items.has(dessertId);
  }

  /**
   * Get a specific cart item
   * @param dessertId - ID to get
   * @returns CartItem or undefined
   */
  getItem(dessertId: DessertId): CartItem | undefined {
    return this.items.get(dessertId);
  }

  /**
   * Load cart items from an array (useful for persistence)
   * @param items - Array of cart items to load
   */
  loadItems(items: CartItem[]): void {
    this.items.clear();
    items.forEach((item) => {
      this.items.set(item.dessert.id, item);
    });
    this.emit({ type: "CART_LOADED", items });
  }
}
