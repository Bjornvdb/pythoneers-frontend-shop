<template>
  <footer class="footer test">
    <div class="p-text-center footer-logo ftr-frst">  
      <a class="logo-link" target="_blank" href="http://pythoneers-frontend-website-ucllteam15.ocp-ucll-40cb0df2b03969eabb3fac6e80373775-0000.eu-de.containers.appdomain.cloud/">
        <Avatar
          size="xlarge"
          image="https://i.pinimg.com/originals/74/26/cf/7426cf05ffe331b889b1459cd0005054.png"
        ></Avatar>
        <h3 style="color: rgba(255, 255, 255, 0.87);font-family: 'Satisfy',cursive; font-size: 30px; margin: 0px">CoffeeTaste</h3>
        <p style="color: rgba(255, 255, 255, 0.87);margin: 0;font-family: 'Caveat', cursive; font-size: 20px">A new world of coffee</p>
      </a>
    </div>
    <hr style="margin: 0px">
    <div class="p-py-3 p-text-center">
      <p class="p-component" style="margin: 0px">{{ t("made") }} <span class="p-text-bold">Pythoneers @2021</span></p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: "global" });
    return { 
      t,
    };
  },
});
</script>