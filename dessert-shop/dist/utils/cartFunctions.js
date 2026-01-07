/**
 * Add a dessert to the cart with specified quantity
 * @param cart - Current cart items
 * @param dessert - Dessert to add
 * @param quantity - Quantity to add (default: 1)
 * @returns New cart array (immutable)
 */
export function addToCart(cart, dessert, quantity = 1) {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }
    if (!dessert.inStock) {
        throw new Error("Dessert is not in stock");
    }
    const existingItemIndex = cart.findIndex((item) => item.dessert.id === dessert.id);
    if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newCart = [...cart];
        newCart[existingItemIndex] = Object.assign(Object.assign({}, newCart[existingItemIndex]), { quantity: newCart[existingItemIndex].quantity + quantity });
        return newCart;
    }
    // Add new item
    return [
        ...cart,
        {
            dessert,
            quantity,
            addedAt: new Date()
        }
    ];
}
/**
 * Remove a dessert from the cart by ID
 * @param cart - Current cart items
 * @param dessertId - ID of dessert to remove
 * @returns New cart array without the item
 */
export function removeFromCart(cart, dessertId) {
    return cart.filter((item) => item.dessert.id !== dessertId);
}
/**
 * Update the quantity of a cart item
 * @param cart - Current cart items
 * @param dessertId - ID of dessert to update
 * @param newQuantity - New quantity (removes if 0)
 * @returns New cart array with updated quantity
 */
export function updateQuantity(cart, dessertId, newQuantity) {
    if (newQuantity < 0) {
        throw new Error("Quantity cannot be negative");
    }
    if (newQuantity === 0) {
        return removeFromCart(cart, dessertId);
    }
    const itemIndex = cart.findIndex((item) => item.dessert.id === dessertId);
    if (itemIndex === -1) {
        throw new Error("Item not found in cart");
    }
    const newCart = [...cart];
    newCart[itemIndex] = Object.assign(Object.assign({}, newCart[itemIndex]), { quantity: newQuantity });
    return newCart;
}
/**
 * Increment quantity of a cart item
 * @param cart - Current cart items
 * @param dessertId - ID of dessert to increment
 * @returns New cart array
 */
export function incrementQuantity(cart, dessertId) {
    const item = cart.find((item) => item.dessert.id === dessertId);
    if (!item) {
        throw new Error("Item not found in cart");
    }
    return updateQuantity(cart, dessertId, item.quantity + 1);
}
/**
 * Decrement quantity of a cart item
 * @param cart - Current cart items
 * @param dessertId - ID of dessert to decrement
 * @returns New cart array
 */
export function decrementQuantity(cart, dessertId) {
    const item = cart.find((item) => item.dessert.id === dessertId);
    if (!item) {
        throw new Error("Item not found in cart");
    }
    return updateQuantity(cart, dessertId, Math.max(0, item.quantity - 1));
}
/**
 * Calculate cart totals
 * @param cart - Current cart items
 * @param taxRate - Tax rate (default: 0, no tax)
 * @returns Object with subtotal, tax, and total
 */
export function calculateTotal(cart, taxRate = 0) {
    const subtotal = cart.reduce((sum, item) => sum + item.dessert.price * item.quantity, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return {
        subtotal: Math.round(subtotal * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        total: Math.round(total * 100) / 100
    };
}
/**
 * Get total number of items in cart
 * @param cart - Current cart items
 * @returns Total item count
 */
export function getCartItemCount(cart) {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}
/**
 * Check if cart is empty
 * @param cart - Current cart items
 * @returns True if cart is empty
 */
export function isCartEmpty(cart) {
    return cart.length === 0;
}
/**
 * Find a cart item by dessert ID
 * @param cart - Current cart items
 * @param dessertId - ID to search for
 * @returns CartItem if found, undefined otherwise
 */
export function findCartItem(cart, dessertId) {
    return cart.find((item) => item.dessert.id === dessertId);
}
