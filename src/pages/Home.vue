<template>
  <NavBar />
  <MainBody />
  <Footer />
  <Toast position="bottom-right" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Our components
import NavBar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";
import MainBody from "@/components/layout/MainBody.vue";

// Lib components
import Toast from "primevue/toast";

export default defineComponent({
  name: "App",
  components: {
    Toast,
    NavBar,
    Footer,
    MainBody,
  },
});
</script>
