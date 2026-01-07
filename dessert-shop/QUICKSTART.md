# Quick Start Guide

## 🚀 Run the Application

### Method 1: Simple File Open (Easiest)
1. Navigate to the project folder
2. Double-click `index.html` to open in your browser
3. The app should work immediately!

### Method 2: Using Python (Recommended)
```bash
# Navigate to project folder
cd "c:\Users\TECH HEAVEN\Downloads\dessert-shop"

# Start Python server
python -m http.server 8000
```
Then open: http://localhost:8000

### Method 3: Using Node.js
```bash
# Navigate to project folder
cd "c:\Users\TECH HEAVEN\Downloads\dessert-shop"

# Start server with npx (no installation needed)
npx http-server -p 8000
```
Then open: http://localhost:8000

### Method 4: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🔧 Making Changes

If you want to modify the TypeScript code:

1. **Make your changes** in the `src/` folder
2. **Compile TypeScript**:
   ```bash
   npm run build
   ```
3. **Refresh the browser** to see changes

### Watch Mode (Auto-compile)
To automatically recompile when you save files:
```bash
npm run watch
```
Keep this terminal open while developing!

## 🎯 How to Use the App

### Adding Items to Cart
1. Click "Add to Cart" button on any dessert
2. Use + and - buttons to adjust quantity
3. Watch the cart update in real-time

### Managing Cart
- Click × next to any item to remove it
- Cart shows quantity, price per item, and total
- Order total updates automatically

### Placing an Order
1. Click "Confirm Order" button
2. Review your order in the modal
3. Click "Start New Order" to clear cart and start over

## 📁 Project Structure Overview

```
dessert-shop/
├── index.html          # Main HTML file - OPEN THIS
├── styles/
│   └── main.css        # All styles here
├── src/                # TypeScript source files
│   ├── main.ts         # Main UI controller
│   ├── types/          # Type definitions
│   ├── classes/        # ShoppingCart & OrderManager
│   ├── data/           # Dessert data
│   └── utils/          # Utility functions
├── dist/               # Compiled JavaScript (generated)
└── asserts/            # Images and icons
```

## 🐛 Troubleshooting

### TypeScript Not Compiling?
```bash
# Make sure dependencies are installed
npm install

# Try compiling again
npm run build
```

### Images Not Loading?
- Make sure you're viewing the app from the project root
- Check that the `asserts/` folder contains all images
- Use a local server instead of opening the file directly

### Changes Not Showing?
1. Did you compile TypeScript? Run `npm run build`
2. Did you refresh the browser? Press Ctrl+F5 (hard refresh)
3. Check browser console for errors (F12)

## 💡 Next Steps

### Explore the Code
- **Start with**: `src/main.ts` - Main UI controller
- **Then check**: `src/classes/ShoppingCart.ts` - Cart logic
- **Finally**: `src/types/index.ts` - Type definitions

### Try These Exercises
1. Add a new dessert to `src/data/desserts.ts`
2. Change colors in `styles/main.css`
3. Add a discount feature to the cart
4. Implement local storage to persist cart

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `index.html` | Main page structure |
| `styles/main.css` | All styling and responsive design |
| `src/main.ts` | UI logic and DOM manipulation |
| `src/classes/ShoppingCart.ts` | Cart state and operations |
| `src/classes/OrderManager.ts` | Order creation and management |
| `src/data/desserts.ts` | Dessert data array |
| `src/types/index.ts` | TypeScript types and interfaces |

## 🎨 Customization Ideas

### Change Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
  --color-red: hsl(14, 86%, 42%);      /* Primary color */
  --color-green: hsl(159, 69%, 38%);   /* Success color */
  /* ... */
}
```

### Add New Desserts
Edit `src/data/desserts.ts`:
```typescript
{
  id: "new-dessert",
  name: "New Dessert Name",
  category: DessertCategory.Cake,
  price: 7.50,
  image: "./asserts/image-new.jpg",
  inStock: true
}
```

### Modify Layout
- Desktop: 3 columns grid
- Tablet: 2-3 columns grid  
- Mobile: 1 column stack

Edit in `styles/main.css` under media queries!

## 🤝 Need Help?

- Check the browser console (F12) for error messages
- Review the README.md for detailed documentation
- All TypeScript code has JSDoc comments explaining functionality

Happy coding! 🎉
