# TypeScript Dessert Shop

A fully functional dessert shop application built with TypeScript, featuring a shopping cart, order management, and responsive design.

## 🎯 Project Overview

This project demonstrates advanced TypeScript concepts including:
- **Strict type safety** with interfaces, enums, and type aliases
- **Object-oriented programming** with classes
- **Functional programming** with pure functions
- **Event-driven architecture** with the observer pattern
- **Immutable data patterns**
- **Responsive UI** for mobile, tablet, and desktop

## 📁 Project Structure

```
dessert-shop/
├── src/
│   ├── types/
│   │   └── index.ts           # Type definitions, interfaces, and enums
│   ├── data/
│   │   └── desserts.ts        # Dessert data array
│   ├── utils/
│   │   └── cartFunctions.ts   # Functional cart utilities
│   ├── classes/
│   │   ├── ShoppingCart.ts    # ShoppingCart class with events
│   │   └── OrderManager.ts    # OrderManager class
│   └── main.ts                # Main UI controller
├── styles/
│   └── main.css               # Responsive CSS styles
├── asserts/                   # Images and icons
├── dist/                      # Compiled JavaScript (generated)
├── index.html                 # Main HTML file
├── package.json               # Project dependencies
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd dessert-shop
```

2. Install dependencies:
```bash
npm install
```

3. Compile TypeScript:
```bash
npm run build
```

4. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

### Development

To watch for changes and automatically recompile:
```bash
npm run watch
```

## 📚 Features Implemented

### Phase 1: Type Definitions ✅
- ✅ `Dessert` interface with all properties
- ✅ `CartItem` interface with dessert, quantity, and addedAt
- ✅ `DessertCategory` enum with 9 categories
- ✅ Type aliases: `OrderStatus`, `Currency`, `DessertId`
- ✅ `Order` and `OrderDetails` interfaces
- ✅ `CartEvent` discriminated union for event system

### Phase 2: Cart Functions ✅
- ✅ `addToCart()` - Add items with duplicate handling
- ✅ `removeFromCart()` - Remove items by ID
- ✅ `updateQuantity()` - Update item quantities
- ✅ `incrementQuantity()` & `decrementQuantity()` - Helper functions
- ✅ `calculateTotal()` - Calculate subtotal, tax, and total
- ✅ Additional utilities: `getCartItemCount()`, `isCartEmpty()`, `findCartItem()`

### Phase 3: Object-Oriented Approach ✅
- ✅ `ShoppingCart` class with private `Map<string, CartItem>`
- ✅ Methods: `addItem`, `removeItem`, `updateQuantity`, `getTotal`, `getItemCount`, `getItems`, `clear`
- ✅ Getters: `isEmpty`, `hasItem`, `getItem`
- ✅ Event system with `subscribe()` method
- ✅ Event emission on cart changes
- ✅ Unsubscribe functionality

### Phase 4: Order Management ✅
- ✅ `OrderManager` class
- ✅ Methods: `createOrder`, `confirmOrder`, `cancelOrder`, `completeOrder`
- ✅ Methods: `getOrder`, `getAllOrders`, `getOrdersByStatus`
- ✅ Additional utilities: `getTotalRevenue`, `deleteOrder`, `clearAllOrders`

### Phase 5: UI Implementation ✅
- ✅ Responsive HTML structure
- ✅ Mobile-first CSS with breakpoints for tablet and desktop
- ✅ Dynamic dessert card rendering
- ✅ Interactive add to cart buttons
- ✅ Quantity controls with increment/decrement
- ✅ Real-time cart updates
- ✅ Order confirmation modal
- ✅ Empty cart state with illustration
- ✅ Carbon-neutral delivery badge

## 🎨 Design Features

- **Responsive Layout**: Optimized for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Color Scheme**: Custom color palette matching the design
- **Interactive Elements**: Hover effects, smooth transitions
- **Accessibility**: Semantic HTML, proper contrast ratios
- **Visual Feedback**: Active states for items in cart

## 🧪 TypeScript Features Used

### Strict Type Checking
```typescript
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"strictFunctionTypes": true
```

### Advanced Types
- Interfaces and type aliases
- Enums for categorical data
- Discriminated unions for events
- Generic types
- Type guards

### OOP Concepts
- Classes with private properties
- Encapsulation
- Method chaining potential
- Observer pattern implementation

### Functional Programming
- Pure functions
- Immutability
- Higher-order functions
- Array methods (map, filter, reduce)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm run dev` - Alias for watch mode

## 💡 Usage Example

```typescript
// Create a shopping cart
const cart = new ShoppingCart();

// Subscribe to cart events
const unsubscribe = cart.subscribe((event) => {
  console.log("Cart event:", event);
});

// Add items
cart.addItem(desserts[0], 2);
cart.addItem(desserts[1], 1);

// Update quantities
cart.incrementQuantity("waffle-berries");
cart.decrementQuantity("creme-brulee");

// Get cart info
console.log("Total items:", cart.getItemCount());
console.log("Total price:", cart.getTotal());

// Create an order
const orderManager = new OrderManager();
const order = orderManager.createOrder(cart);
orderManager.confirmOrder(order.id);

// Clear cart
cart.clear();

// Unsubscribe from events
unsubscribe();
```

## 📝 Code Quality

- **Type Safety**: 100% TypeScript with strict mode
- **Immutability**: Pure functions that don't mutate input
- **Error Handling**: Proper error throwing and validation
- **Documentation**: JSDoc comments for all public methods
- **Clean Code**: Consistent formatting and naming conventions

## 🎓 Learning Outcomes

This project demonstrates:
1. TypeScript fundamentals and advanced features
2. Object-oriented and functional programming paradigms
3. Event-driven architecture
4. State management patterns
5. DOM manipulation and UI updates
6. Responsive web design
7. CSS Grid and Flexbox layouts
8. Modern JavaScript ES6+ features

## 📄 License

MIT

## 🙏 Acknowledgments

- Design inspiration from Frontend Mentor
- Icons and illustrations included in the asserts folder
