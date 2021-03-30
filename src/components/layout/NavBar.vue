<template>
  <toolbar class="test">
    <template #left>
      <Avatar
        size="xlarge"
        image="https://i.pinimg.com/originals/74/26/cf/7426cf05ffe331b889b1459cd0005054.png"
      ></Avatar>
      <h3 style="color: rgba(255, 255, 255, 0.87)">CoffeeTaste</h3>
    </template>
    <template #right>
      <SelectButton class="p-mr-4" v-model="lang" :options="languages" />
      <Button :label="t('login')" icon="pi pi-user" class="p-button-outlined" />
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

<script>
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

// Lib components
import Toolbar from "primevue/toolbar";
import SelectButton from "primevue/selectbutton";

// Own components
import ShoppingCartTable from "@/components/shopping-cart/ShoppingCartTable.vue";

export default defineComponent({
  components: { Toolbar, SelectButton, ShoppingCartTable },

  setup() {
    const store = useStore();
    const { t, locale } = useI18n({ useScope: "global" });

    const lang = ref(locale);

    const open = ref(false);

    const languages = ref(["en", "nl"]);

    return {
      numberOfProducts: computed(() => store.getters.numberOfProductsInCart),
      storef: computed(() => store.state.coffees),
      productsInCart: computed(() => store.getters.getProductsInBasket),
      lang,
      languages,
      t,
      open,
    };
  },
});
</script>
