import { createI18n } from "vue-i18n";

const messages = {
  en: {
    test: "test en",
    login: "Login",
    shopping_cart: "Shopping cart",
    order: "Order",
    add_to_cart: "Add to shopping card",
    price: "Price",
    in_stock: "In stock",
    no_products: "No products",
    origin: "Origin",
    made: "Made by the",
  },
  nl: {
    test: "test nl",
    login: "Inloggen",
    shopping_cart: "Winkelwagen",
    order: "Bestellen",
    add_to_cart: "Aan winkelwagen toevoegen",
    price: "Prijs",
    in_stock: "In voorraad",
    no_products: "Geen producten",
    origin: "Herkomst",
    made: "Gemaakt door de",
  },
};

export default createI18n({
  locale: "en",
  legacy: false,
  messages,
});
