<template>
  <DataTable v-if="products.length > 0" :value="products">
    <template #header>
      <div class="table-header">{{ t("products") }}</div>
    </template>
    <Column field="title" :header="t('title')"></Column>
    <Column :header="t('image')">
      <template #body="slotProps">
        <img :src="slotProps.data.thumbnail_url" class="product-image" />
      </template>
    </Column>
    <Column field="amountInBasket" :header="t('amount')"></Column>
    <Column field="price" :header="t('price')">
      <template #body="slotProps"> €{{ slotProps.data.price }} </template>
    </Column>
    <Column :exportable="false" :header="t('actions')">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success p-mr-2"
          @click="editProduct(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click="confirmDeleteProduct(slotProps.data)"
        />
      </template>
    </Column>
    <template #footer>
      {{ t("total", { products: products ? products.length : 0, totalPrice }) }}
    </template>
  </DataTable>
  <h3 v-else class="p-m-0 p-text-center p-text-bolder">
    {{ t("no_products") }}
  </h3>
  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '450px' }"
    :header="t('confirm')"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span v-if="coffeeTemp">
        {{ t("sure", { coffee: coffeeTemp.title }) }} <b></b
      ></span>
    </div>
    <template #footer>
      <Button
        :label="t('no')"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteProductDialog = false"
      />
      <Button
        :label="t('yes')"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteProduct"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

// Lib components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useStore } from "vuex";
import { coffee } from "@/interfaces";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: { DataTable, Column },
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });

    const deleteProductDialog = ref(false);
    const coffeeTemp = ref<coffee | null>(null);

    const confirmDeleteProduct = (coffee: coffee) => {
      coffeeTemp.value = coffee;
      deleteProductDialog.value = true;
    };

    const deleteProduct = () => {
      store.commit("deleteProductFromCard", coffeeTemp.value);
      coffeeTemp.value = null;
      deleteProductDialog.value = false;
    };

    return {
      products: computed(() => store.getters.getProductsInBasket),
      totalPrice: computed(() => store.getters.totalPrice),
      deleteProductDialog,
      confirmDeleteProduct,
      coffeeTemp,
      deleteProduct,
      t,
    };
  },
});
</script>

<style>
.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>