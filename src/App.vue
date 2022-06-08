<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
import EmptyLayout from "@/layouts/Empty.vue";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    EmptyLayout,
  },
  setup() {
    const route = useRoute();
    const layout = computed(() => `${route.meta.layout || "empty"}-layout`);

    return {
      layout,
    };
  },
});
</script>

<style lang="less">
body {
  font-family: "Roboto", sans-serif !important;
}
#app,
.main,
.layout {
  height: 100%;
}
.layout__inner {
  max-width: 1340px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
