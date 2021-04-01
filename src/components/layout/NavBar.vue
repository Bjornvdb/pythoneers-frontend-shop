<template>
  <toolbar class="test">
    <template #left>
      <Avatar
        size="xlarge"
        image="https://i.pinimg.com/originals/74/26/cf/7426cf05ffe331b889b1459cd0005054.png"
      ></Avatar>
      <div>
        <h3
          style="
            color: rgba(255, 255, 255, 0.87);
            font-family: 'Satisfy', cursive;
            font-size: 30px;
            margin: 0px;
          "
        >
          CoffeeTaste
        </h3>
        <p
          style="
            color: rgba(255, 255, 255, 0.87);
            margin: 0;
            font-family: 'Caveat', cursive;
            font-size: 20px;
          "
        >
          A new world of coffee
        </p>
      </div>
    </template>
    <template #right>
      <Dropdown
        v-model="locale"
        :options="languages"
        optionLabel="name"
        optionValue="code"
        placeholder="Select a City"
        class="p-mr-4"
      />
      <Button
        :label="t('login')"
        @click="onLoginClicked"
        v-if="!user.isAuthenticated"
        icon="pi pi-user"
        class="p-button-outlined"
      />
      <SplitButton
        v-if="user.isAuthenticated"
        :label="user.name"
        :model="items"
      ></SplitButton>
      <Button
        icon="pi pi-shopping-cart"
        @click="open = true"
        :label="t('shopping_cart')"
        class="p-ml-2 p-button-outlined"
        :badge="numberOfProducts > 0 ? numberOfProducts : ''"
      />
    </template>
  </toolbar>
  <Dialog
    :header="t('shopping_cart')"
    v-model:visible="open"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <ShoppingCartTable />
    <template #footer>
      <Button :label="t('order')" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

// Lib components
import Toolbar from "primevue/toolbar";
import Dropdown from "primevue/dropdown";
import SplitButton from "primevue/splitbutton";

import { useToast } from "primevue/usetoast";

// Own components
import ShoppingCartTable from "@/components/shopping-cart/ShoppingCartTable.vue";

export default defineComponent({
  components: {
    Toolbar,
    ShoppingCartTable,
    SplitButton,
    Dropdown,
  },

  setup() {
    const store = useStore();
    const { t, locale } = useI18n({ useScope: "global" });
    const toast = useToast();

    console.log(locale.value);

    const open = ref(false);

    const logout = ref(t("logout"));

    const items = ref([
      {
        label: logout.value,
        icon: "pi pi-user-minus",
        command: () => {
          store.commit("logout");
          toast.add({
            severity: "info",
            summary: "Logged out",
            detail: "You have been successfully logged out!",
            life: 3000,
          });
        },
      },
    ]);

    const onLoginClicked = () => {
      window.location = store.state.endpoints.login;
    };

    const languages = ref([
      { name: "Nederlands", code: "nl" },
      { name: "English", code: "en" },
    ]);

    return {
      numberOfProducts: computed(() => store.getters.numberOfProductsInCart),
      storef: computed(() => store.state.coffees),
      productsInCart: computed(() => store.getters.getProductsInBasket),
      user: computed(() => store.state.user),
      locale,
      languages,
      t,
      open,
      onLoginClicked,
      items,
    };
  },
});
</script>
