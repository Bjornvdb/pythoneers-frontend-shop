<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const { locale } = useI18n({ useScope: "global" });

    locale.value = store.state.lang;
  },
});
</script>