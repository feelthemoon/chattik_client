<template>
  <main class="main verify">
    <div class="auth-form verify__card">
      <div>
        <info-circle-two-tone
          :style="{ fontSize: '35px' }"
        ></info-circle-two-tone>
        <h1 class="verify__title">{{ $t("pages.verify.title") }}</h1>
        <p class="verify__text">
          {{ $t("pages.verify.text") }}
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { InfoCircleTwoTone } from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubmitRegistration",
  components: {
    InfoCircleTwoTone,
  },
});
</script>
