/**
 * Example Usage and Tests for Dessert Shop
 * This file demonstrates how to use all the core functionality
 */

import { ShoppingCart } from "./classes/ShoppingCart.js";
import { OrderManager } from "./classes/OrderManager.js";
import { desserts } from "./data/desserts.js";
import { 
  addToCart, 
  removeFromCart, 
  calculateTotal,
  incrementQuantity,
  decrementQuantity 
} from "./utils/cartFunctions.js";
import { CartItem } from "./types/index.js";

// ============================================
// Example 1: Functional Approach
// ============================================
console.log("=== FUNCTIONAL APPROACH ===");

let cart: CartItem[] = [];

// Add items to cart
cart = addToCart(cart, desserts[0], 1);  // Waffle with Berries
cart = addToCart(cart, desserts[1], 2);  // Crème Brûlée x2
cart = addToCart(cart, desserts[2], 1);  // Macaron Mix

console.log("Cart items:", cart.length);
console.log("Cart contents:", cart);

// Update quantities
cart = incrementQuantity(cart, desserts[0].id);  // Waffle: 1 -> 2
cart = decrementQuantity(cart, desserts[1].id);  // Crème Brûlée: 2 -> 1

// Calculate total
const totals = calculateTotal(cart);
console.log("Subtotal:", totals.subtotal);
console.log("Tax:", totals.tax);
console.log("Total:", totals.total);

// Remove item
cart = removeFromCart(cart, desserts[2].id);
console.log("After removing macaron:", cart.length);

// ============================================
// Example 2: Object-Oriented Approach
// ============================================
console.log("\n=== OBJECT-ORIENTED APPROACH ===");

const shoppingCart = new ShoppingCart();

// Subscribe to cart events
const unsubscribe = shoppingCart.subscribe((event) => {
  console.log("Cart Event:", event.type);
  
  switch (event.type) {
    case "ITEM_ADDED":
      console.log(`  Added: ${event.item.dessert.name} (${event.item.quantity}x)`);
      break;
    case "ITEM_REMOVED":
      console.log(`  Removed item with ID: ${event.dessertId}`);
      break;
    case "QUANTITY_UPDATED":
      console.log(`  Updated quantity for ${event.dessertId}: ${event.quantity}`);
      break;
    case "CART_CLEARED":
      console.log("  Cart cleared!");
      break;
  }
});

// Add items
shoppingCart.addItem(desserts[3], 1);  // Tiramisu
shoppingCart.addItem(desserts[4], 2);  // Baklava x2
shoppingCart.addItem(desserts[5], 1);  // Lemon Meringue Pie

console.log("\nCart Status:");
console.log("  Items:", shoppingCart.getItemCount());
console.log("  Subtotal: $", shoppingCart.getSubtotal());
console.log("  Total: $", shoppingCart.getTotal());
console.log("  Is Empty:", shoppingCart.isEmpty);

// Update quantities
shoppingCart.incrementQuantity(desserts[3].id);  // Tiramisu: 1 -> 2
shoppingCart.updateQuantity(desserts[4].id, 5);  // Baklava: 2 -> 5

// Check specific items
console.log("\nItem Check:");
console.log("  Has Tiramisu:", shoppingCart.hasItem(desserts[3].id));
console.log("  Has Waffle:", shoppingCart.hasItem(desserts[0].id));

const tiramisuItem = shoppingCart.getItem(desserts[3].id);
if (tiramisuItem) {
  console.log("  Tiramisu quantity:", tiramisuItem.quantity);
}

// Get all items
const allItems = shoppingCart.getItems();
console.log("\nAll cart items:");
allItems.forEach((item) => {
  console.log(`  - ${item.dessert.name}: ${item.quantity}x @ $${item.dessert.price}`);
});

// ============================================
// Example 3: Order Management
// ============================================
console.log("\n=== ORDER MANAGEMENT ===");

const orderManager = new OrderManager();

// Create order from cart
const order = orderManager.createOrder(shoppingCart, "USD");
console.log("Order created:", order.id);
console.log("  Status:", order.status);
console.log("  Total items:", order.details.items.length);
console.log("  Subtotal: $", order.details.subtotal);
console.log("  Total: $", order.details.total);

// Confirm order
const confirmedOrder = orderManager.confirmOrder(order.id);
console.log("\nOrder confirmed:", confirmedOrder.id);
console.log("  Status:", confirmedOrder.status);
console.log("  Confirmed at:", confirmedOrder.confirmedAt);

// Complete order
const completedOrder = orderManager.completeOrder(order.id);
console.log("\nOrder completed:", completedOrder.id);
console.log("  Status:", completedOrder.status);

// Get all orders
const allOrders = orderManager.getAllOrders();
console.log("\nTotal orders:", allOrders.length);

// Get orders by status
const completedOrders = orderManager.getOrdersByStatus("completed");
console.log("Completed orders:", completedOrders.length);

// Get total revenue
const revenue = orderManager.getTotalRevenue();
console.log("Total revenue: $", revenue);

// ============================================
// Example 4: Advanced Usage
// ============================================
console.log("\n=== ADVANCED USAGE ===");

// Create a new cart for demonstration
const advancedCart = new ShoppingCart();

// Add multiple items at once
desserts.slice(0, 3).forEach((dessert, index) => {
  advancedCart.addItem(dessert, index + 1);
});

console.log("Added multiple items:");
console.log("  Total items:", advancedCart.getItemCount());
console.log("  Total: $", advancedCart.getTotal());

// Export cart items for persistence
const cartData = advancedCart.getItems();
console.log("\nCart data for storage:", cartData);

// Simulate loading cart from storage
const restoredCart = new ShoppingCart();
restoredCart.loadItems(cartData);
console.log("\nRestored cart:");
console.log("  Items:", restoredCart.getItemCount());
console.log("  Total: $", restoredCart.getTotal());

// Calculate total with tax
const totalWithTax = advancedCart.getTotal(0.1); // 10% tax
console.log("\nTotal with 10% tax: $", totalWithTax);

// Clear cart
advancedCart.clear();
console.log("\nCart cleared. Is empty:", advancedCart.isEmpty);

// ============================================
// Example 5: Error Handling
// ============================================
console.log("\n=== ERROR HANDLING ===");

try {
  // Try to add 0 quantity
  shoppingCart.addItem(desserts[0], 0);
} catch (error) {
  console.log("Caught error:", (error as Error).message);
}

try {
  // Try to update non-existent item
  shoppingCart.updateQuantity("non-existent-id", 5);
} catch (error) {
  console.log("Caught error:", (error as Error).message);
}

try {
  // Try to create order from empty cart
  const emptyCart = new ShoppingCart();
  orderManager.createOrder(emptyCart);
} catch (error) {
  console.log("Caught error:", (error as Error).message);
}

// Unsubscribe from events
unsubscribe();
console.log("\nUnsubscribed from cart events");

// ============================================
// Summary
// ============================================
console.log("\n=== SUMMARY ===");
console.log("✓ Functional cart operations");
console.log("✓ Object-oriented cart with events");
console.log("✓ Order creation and management");
console.log("✓ Multiple order statuses");
console.log("✓ Cart persistence (load/export)");
console.log("✓ Error handling");
console.log("✓ Event subscription system");
console.log("\nAll examples completed successfully!");

export {};
