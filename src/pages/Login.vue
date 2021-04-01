<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    onMounted(() => {
      const { name, email, id_token } = route.query;

      if (
        name &&
        email &&
        id_token &&
        name != "" &&
        email != "" &&
        id_token != ""
      ) {
        store.commit("login", { name, email, id_token });
      } else {
        store.commit("logout");
      }

      router.push("/");
    });
  },
});
</script>

<style scoped>
</style>