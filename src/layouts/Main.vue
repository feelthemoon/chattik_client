<template>
  <div class="layout layout--main">
    <div class="layout__inner">
      <sidebar></sidebar>
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
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  name: "Main",
  components: { Sidebar },
});
</script>
