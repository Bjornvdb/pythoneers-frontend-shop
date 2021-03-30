<template>
  <div class="footer test p-py-5 p-text-center">
    <p class="p-text-bold p-component">{{ t("made") }} Pythoneers @2021</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: "global" });

    return { t };
  },
});
</script>