<template>
  <main class="not-found main">
    <div class="not-found__inner">
      <a-result
        status="404"
        :title="$t('pages.404.title')"
        :sub-title="$t('pages.404.subtitle')"
      >
        <template #extra>
          <div class="back">
            <router-link to="/im">{{ $t("pages.404.link_text") }}</router-link>
          </div>
        </template>
      </a-result>
    </div>
  </main>
</template>

<script lang="ts">
import { Result } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    AResult: Result,
  },
});
</script>
