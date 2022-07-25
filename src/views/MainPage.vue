<template>
  <div class="main-page">
    <a-empty :description="$t('pages.main.empty_description')"></a-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Empty } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "MainPage",
  components: { AEmpty: Empty },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();

    if (route.query.token) {
      store.dispatch("auth/verifyUser", route.query.token).then(() => {
        router.push({ name: "MainPage" });
      });
    }
  },
});
</script>
