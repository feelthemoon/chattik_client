<template>
  <div class="layout layout--empty">
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

<style lang="less" scoped>
.slide-fade {
  &-enter-active {
    transition: all 0.3s ease-out;
  }
  &-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(40px);
    opacity: 0;
  }
}
</style>
