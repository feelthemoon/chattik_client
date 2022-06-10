<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import EmptyLayout from "@/layouts/Empty.vue";

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
