import { coffee } from "@/interfaces";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  state: {
    coffees: [] as coffee[],
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: "",
    },
    endpoints: {
      login: "http://localhost:3000/login",
    },
  },
  getters: {
    numberOfProductsInCart(state) {
      return state.coffees.filter((coffee) => coffee.amountInBasket !== 0)
        .length;
    },
    totalPrice(state) {
      let total = 0;
      state.coffees.forEach(
        (product) => (total += product.amountInBasket * product.price)
      );
      return total.toFixed(2);
    },
    getProductsInBasket(state) {
      return state.coffees.filter((coffee) => coffee.amountInBasket !== 0);
    },
  },
  mutations: {
    addToCart(state, coffee: coffee) {
      if (coffee.amountInBasket === 0) {
        coffee.amountInBasket = coffee.amountSelected;
        coffee.amountSelected = 1;
      } else {
        coffee.amountInBasket += coffee.amountSelected;
        coffee.amountSelected = 1;
      }
    },
    deleteProductFromCard(state, coffee: coffee) {
      coffee.amountInBasket = 0;
    },
    setProducts(state, products) {
      state.coffees = products.map((p: coffee) => {
        p.amountInBasket = 0;
        p.amountSelected = 1;
        return p;
      });
    },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.email = "";
      state.user.idToken = "";
    },
    login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.idToken = payload.id_token;
    },
  },
  actions: {
    async getProducts(context) {
      const { data } = await axios.get("http://localhost:8080/api/products");
      context.commit("setProducts", data);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
