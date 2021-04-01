import { createI18n } from "vue-i18n";

const messages = {
  en: {
    test: "test en",
    login: "SignUp/SignIn",
    shopping_cart: "Shopping cart",
    order: "Order",
    add_to_cart: "Add to Cart",
    price: "Price",
    in_stock: "In stock",
    no_products: "Your Cart is empty",
    origin: "Origin",
    made: "Made by the",
    logout: "Logout",
  },
  nl: {
    test: "test nl",
    login: "Inloggen/Registreren",
    shopping_cart: "Winkelwagen",
    order: "Bestellen",
    add_to_cart: "Aan winkelwagen toevoegen",
    price: "Prijs",
    in_stock: "In voorraad",
    no_products: "Geen producten",
    origin: "Herkomst",
    made: "Gemaakt door de",
    logout: "Uitloggen",
  },
};

export default createI18n({
  locale: "en",
  legacy: false,
  messages,
});
