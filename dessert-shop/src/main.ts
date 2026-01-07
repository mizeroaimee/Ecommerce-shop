import { ShoppingCart } from "./classes/ShoppingCart.js";
import { OrderManager } from "./classes/OrderManager.js";
import { desserts } from "./data/desserts.js";
import { Dessert, CartItem, Order } from "./types/index.js";

class DessertShopUI {
  private cart: ShoppingCart;
  private orderManager: OrderManager;

  // DOM Elements
  private dessertsGrid: HTMLElement;
  private cartCount: HTMLElement;
  private emptyCart: HTMLElement;
  private cartItems: HTMLElement;
  private orderTotal: HTMLElement;
  private orderTotalPrice: HTMLElement;
  private carbonNeutral: HTMLElement;
  private confirmOrderBtn: HTMLElement;
  private orderModal: HTMLElement;
  private modalItems: HTMLElement;
  private modalTotalPrice: HTMLElement;
  private startNewOrderBtn: HTMLElement;

  constructor() {
    this.cart = new ShoppingCart();
    this.orderManager = new OrderManager();

    // Initialize DOM elements
    this.dessertsGrid = this.getElement("#desserts-grid");
    this.cartCount = this.getElement("#cart-count");
    this.emptyCart = this.getElement("#empty-cart");
    this.cartItems = this.getElement("#cart-items");
    this.orderTotal = this.getElement("#order-total");
    this.orderTotalPrice = this.getElement("#order-total-price");
    this.carbonNeutral = this.getElement("#carbon-neutral");
    this.confirmOrderBtn = this.getElement("#confirm-order-btn");
    this.orderModal = this.getElement("#order-modal");
    this.modalItems = this.getElement("#modal-items");
    this.modalTotalPrice = this.getElement("#modal-total-price");
    this.startNewOrderBtn = this.getElement("#start-new-order-btn");

    this.init();
  }

  private getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element as HTMLElement;
  }

  private init(): void {
    this.renderDesserts();
    this.setupEventListeners();
    this.updateCartUI();
  }

  private setupEventListeners(): void {
    // Subscribe to cart events
    this.cart.subscribe((event) => {
      this.updateCartUI();
      if (event.type === "ITEM_ADDED" || event.type === "QUANTITY_UPDATED") {
        this.updateDessertCard(event.type === "ITEM_ADDED" ? event.item.dessert.id : event.dessertId);
      } else if (event.type === "ITEM_REMOVED") {
        this.updateDessertCard(event.dessertId);
      } else if (event.type === "CART_CLEARED") {
        desserts.forEach((dessert) => this.updateDessertCard(dessert.id));
      }
    });

    // Confirm order button
    this.confirmOrderBtn.addEventListener("click", () => {
      this.handleConfirmOrder();
    });

    // Start new order button
    this.startNewOrderBtn.addEventListener("click", () => {
      this.handleStartNewOrder();
    });

    // Modal overlay click to close
    this.orderModal.addEventListener("click", (e) => {
      if (e.target === this.orderModal || (e.target as HTMLElement).classList.contains("modal-overlay")) {
        this.closeModal();
      }
    });
  }

  private renderDesserts(): void {
    this.dessertsGrid.innerHTML = "";

    desserts.forEach((dessert) => {
      const card = this.createDessertCard(dessert);
      this.dessertsGrid.appendChild(card);
    });
  }

  private createDessertCard(dessert: Dessert): HTMLElement {
    const card = document.createElement("div");
    card.className = "dessert-card";
    card.dataset.dessertId = dessert.id;

    const cartItem = this.cart.getItem(dessert.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const inCart = quantity > 0;

    card.innerHTML = `
      <div class="dessert-image-container">
        <img src="${dessert.image}" alt="${dessert.name}" class="dessert-image">
        
        <button class="add-to-cart-btn ${inCart ? "hidden" : ""}" data-dessert-id="${dessert.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
            <g fill="#C73B0F" clip-path="url(#a)">
              <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
              <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
            </g>
            <defs>
              <clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath>
            </defs>
          </svg>
          Add to Cart
        </button>

        <div class="quantity-controls ${!inCart ? "hidden" : ""}" data-dessert-id="${dessert.id}">
          <button class="quantity-btn decrement" data-dessert-id="${dessert.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
              <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
            </svg>
          </button>
          <span class="quantity-display">${quantity}</span>
          <button class="quantity-btn increment" data-dessert-id="${dessert.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="dessert-info">
        <p class="dessert-category">${dessert.category}</p>
        <h3 class="dessert-name">${dessert.name}</h3>
        <p class="dessert-price">$${dessert.price.toFixed(2)}</p>
      </div>
    `;

    // Event listeners for buttons
    const addBtn = card.querySelector(".add-to-cart-btn") as HTMLButtonElement;
    const decrementBtn = card.querySelector(".quantity-btn.decrement") as HTMLButtonElement;
    const incrementBtn = card.querySelector(".quantity-btn.increment") as HTMLButtonElement;

    addBtn?.addEventListener("click", () => {
      this.cart.addItem(dessert, 1);
    });

    decrementBtn?.addEventListener("click", () => {
      this.cart.decrementQuantity(dessert.id);
    });

    incrementBtn?.addEventListener("click", () => {
      this.cart.incrementQuantity(dessert.id);
    });

    return card;
  }

  private updateDessertCard(dessertId: string): void {
    const card = document.querySelector(`[data-dessert-id="${dessertId}"]`) as HTMLElement;
    if (!card) return;

    const cartItem = this.cart.getItem(dessertId);
    const quantity = cartItem ? cartItem.quantity : 0;
    const inCart = quantity > 0;

    // Update card class
    if (inCart) {
      card.classList.add("in-cart");
    } else {
      card.classList.remove("in-cart");
    }

    // Update button visibility
    const addBtn = card.querySelector(".add-to-cart-btn") as HTMLElement;
    const quantityControls = card.querySelector(".quantity-controls") as HTMLElement;
    const quantityDisplay = card.querySelector(".quantity-display") as HTMLElement;

    if (addBtn && quantityControls && quantityDisplay) {
      if (inCart) {
        addBtn.classList.add("hidden");
        quantityControls.classList.remove("hidden");
        quantityDisplay.textContent = quantity.toString();
      } else {
        addBtn.classList.remove("hidden");
        quantityControls.classList.add("hidden");
      }
    }
  }

  private updateCartUI(): void {
    const items = this.cart.getItems();
    const itemCount = this.cart.getItemCount();
    const total = this.cart.getTotal();

    // Update cart count
    this.cartCount.textContent = itemCount.toString();

    // Show/hide empty cart message
    if (items.length === 0) {
      this.emptyCart.classList.remove("hidden");
      this.cartItems.classList.add("hidden");
      this.orderTotal.classList.add("hidden");
      this.carbonNeutral.classList.add("hidden");
      this.confirmOrderBtn.classList.add("hidden");
    } else {
      this.emptyCart.classList.add("hidden");
      this.cartItems.classList.remove("hidden");
      this.orderTotal.classList.remove("hidden");
      this.carbonNeutral.classList.remove("hidden");
      this.confirmOrderBtn.classList.remove("hidden");

      // Render cart items
      this.renderCartItems(items);

      // Update total
      this.orderTotalPrice.textContent = `$${total.toFixed(2)}`;
    }
  }

  private renderCartItems(items: CartItem[]): void {
    this.cartItems.innerHTML = "";

    items.forEach((item) => {
      const cartItem = this.createCartItemElement(item);
      this.cartItems.appendChild(cartItem);
    });
  }

  private createCartItemElement(item: CartItem): HTMLElement {
    const div = document.createElement("div");
    div.className = "cart-item";

    const itemTotal = item.dessert.price * item.quantity;

    div.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.dessert.name}</p>
        <div class="cart-item-details">
          <span class="cart-item-quantity">${item.quantity}x</span>
          <span class="cart-item-price">@ $${item.dessert.price.toFixed(2)}</span>
          <span class="cart-item-total">$${itemTotal.toFixed(2)}</span>
        </div>
      </div>
      <button class="cart-item-remove" data-dessert-id="${item.dessert.id}">×</button>
    `;

    const removeBtn = div.querySelector(".cart-item-remove") as HTMLButtonElement;
    removeBtn.addEventListener("click", () => {
      this.cart.removeItem(item.dessert.id);
    });

    return div;
  }

  private handleConfirmOrder(): void {
    if (this.cart.isEmpty) return;

    const order = this.orderManager.createOrder(this.cart);
    this.orderManager.confirmOrder(order.id);
    
    this.showOrderModal(order);
  }

  private showOrderModal(order: Order): void {
    this.orderModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Render order items in modal
    this.renderModalItems(order.details.items);

    // Update modal total
    this.modalTotalPrice.textContent = `$${order.details.total.toFixed(2)}`;
  }

  private renderModalItems(items: CartItem[]): void {
    this.modalItems.innerHTML = "";

    items.forEach((item) => {
      const modalItem = this.createModalItemElement(item);
      this.modalItems.appendChild(modalItem);
    });
  }

  private createModalItemElement(item: CartItem): HTMLElement {
    const div = document.createElement("div");
    div.className = "modal-item";

    const itemTotal = item.dessert.price * item.quantity;

    div.innerHTML = `
      <img src="${item.dessert.image}" alt="${item.dessert.name}" class="modal-item-image">
      <div class="modal-item-info">
        <p class="modal-item-name">${item.dessert.name}</p>
        <div class="modal-item-details">
          <span class="modal-item-quantity">${item.quantity}x</span>
          <span class="modal-item-price">@ $${item.dessert.price.toFixed(2)}</span>
        </div>
      </div>
      <span class="modal-item-total">$${itemTotal.toFixed(2)}</span>
    `;

    return div;
  }

  private closeModal(): void {
    this.orderModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  private handleStartNewOrder(): void {
    this.cart.clear();
    this.closeModal();
  }
}

// Initialize the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new DessertShopUI();
});
