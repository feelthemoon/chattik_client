<template>
  <div class="main-page">
    <a-empty :description="$t('pages.main.empty_description')"></a-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Empty } from "ant-design-vue";

export default defineComponent({
  name: "MainPage",
  components: { AEmpty: Empty },
});
</script>
