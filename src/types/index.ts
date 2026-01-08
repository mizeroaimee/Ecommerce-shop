// Enums
export enum DessertCategory {
  Waffle = "Waffle",
  CremeBrulee = "Crème Brûlée",
  Macaron = "Macaron",
  Tiramisu = "Tiramisu",
  Baklava = "Baklava",
  Pie = "Pie",
  Cake = "Cake",
  Brownie = "Brownie",
  PannaCotta = "Panna Cotta"
}

// Type Aliases
export type OrderStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type Currency = "USD" | "EUR" | "GBP";
export type DessertId = string;

// Interfaces
export interface Dessert {
  id: DessertId;
  name: string;
  category: DessertCategory;
  price: number;
  image: string;
  description?: string;
  inStock: boolean;
}

export interface CartItem {
  dessert: Dessert;
  quantity: number;
  addedAt: Date;
}

export interface OrderDetails {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: Currency;
}

export interface Order {
  id: string;
  details: OrderDetails;
  status: OrderStatus;
  createdAt: Date;
  confirmedAt?: Date;
}

// Cart Event Types
export type CartEvent =
  | { type: "ITEM_ADDED"; item: CartItem }
  | { type: "ITEM_REMOVED"; dessertId: DessertId }
  | { type: "QUANTITY_UPDATED"; dessertId: DessertId; quantity: number }
  | { type: "CART_CLEARED" }
  | { type: "CART_LOADED"; items: CartItem[] };

export type CartEventCallback = (event: CartEvent) => void;
