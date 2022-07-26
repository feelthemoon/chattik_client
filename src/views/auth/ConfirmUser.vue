<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "ConfirmUser",
  setup() {
    const route = useRoute();
    const store = useStore();

    if (route.query.token) {
      store.dispatch("auth/verifyUser", route.query.token);
    }
  },
});
</script>
