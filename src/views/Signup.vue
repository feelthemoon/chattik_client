<template>
  <main class="auth main">
    <signup-form></signup-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignupForm from "@/components/auth/SignupForm.vue";

export default defineComponent({
  name: "Signup",
  components: { SignupForm },
});
</script>

<style scoped></style>
