<template>
  <div class="layout layout--empty">
    <app-header></app-header>
    <div class="layout__inner">
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/Header.vue";

export default defineComponent({
  name: "Empty",
  components: {
    AppHeader,
  },
});
</script>
