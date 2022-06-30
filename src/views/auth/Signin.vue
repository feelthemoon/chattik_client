<template>
  <main class="auth main">
    <signin-form></signin-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SigninForm from "@/components/forms/SigninForm.vue";

export default defineComponent({
  name: "Auth",
  components: { SigninForm },
});
</script>
