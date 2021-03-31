<template>
  <div class="login">
    <h4 style="margin-top: 30px; margin-bottom: 30px">Logging in ...</h4>
  </div>
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

      console.log(name, email, id_token);

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