<template>
  <a class="p-text-right up-arrow" href="/#"></a>
  <div class="container p-mt-3">
    <div class="p-d-flex p-flex-wrap p-jc-center">
      <div class="p-d-flex p-flex-wrap p-jc-center p-mb-3" v-if="loading">
        <div v-for="i in 6" :key="i" class="custom-skeleton p-mr-2">
          <Skeleton width="25rem" height="250px"></Skeleton>
          <div v-for="i in 2" :key="i" class="p-d-flex p-mb-3 p-mt-3">
            <div>
              <Skeleton width="10rem" class="p-mb-2"></Skeleton>
              <Skeleton width="5rem" class="p-mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <div class="p-d-flex p-jc-between p-mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
          <Skeleton class="p-mt-3" width="100%" height="2rem"></Skeleton>
        </div>
      </div>

      <div class="p-d-flex p-flex-wrap p-jc-center" v-if="!loading">
        <div class="p-mr-2 p-mb-2" v-for="coffee of coffees" :key="coffee.id">
          <Card class="back-dark" style="width: 25em">
            <template #header>
              <div v-if="coffee.quantity <= 0" class="fade">
                <p class="fade-message">{{ t("empty") }}</p>
              </div>
              <img
                alt="coffee image"
                style="max-height: 450px"
                :src="coffee.thumbnail_url"
              />
            </template>
            <template #title>{{ coffee.title }}</template>
            <template subtitle>{{ coffee.title }}</template>
            <template #content>
              <p>{{ coffee.description }}</p>
              <p class="p-text-bold">{{ t("price") }}: €{{ coffee.price }}</p>
              <p
                class="p-text-bold"
                :style="{
                  color:
                    coffee.quantity <= 0 ? 'red' : 'rgba(255, 255, 255, 0.87)',
                }"
              >
                {{ t("in_stock") }}: {{ coffee.quantity }}
              </p>
              <p class="p-text-bold">{{ t("origin") }}: {{ coffee.origin }}</p>
            </template>
            <template #footer>
              <div class="p-d-flex p-jc-center p-flex-column">
                <InputNumber
                  v-model="coffee.amountSelected"
                  showButtons
                  :max="coffee.stock"
                  :min="1"
                  inputClass="p-text-center"
                  buttonLayout="horizontal"
                  decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
                <Button
                  class="p-button-sm p-mt-3"
                  @click="addToCard(coffee)"
                  icon="pi pi-check"
                  :disabled="coffee.quantity <= 0"
                  :label="t('add_to_cart')"
                />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import Skeleton from "primevue/skeleton";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { coffee } from "@/interfaces";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: { Card, InputNumber, Skeleton },
  setup() {
    const toast = useToast();
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });

    const amount = ref(0);
    const loading = ref(true);

    onMounted(async () => {
      store.commit("setUrls");
      await store.dispatch("getProducts");
      setTimeout(() => {
        loading.value = false;
      }, 500);
    });

    const addToCard = (coffee: coffee) => {
      store.commit("addToCart", coffee);
      toast.add({
        severity: "success",
        summary: computed(() => t("product_added")).value,
        detail: computed(() => t("product_added_detail")).value,
        life: 3000,
      });
    };

    return {
      addToCard,
      coffees: computed(() => store.state.coffees),
      amount,
      loading,
      t,
    };
  },
});
</script>

<style>
</style>