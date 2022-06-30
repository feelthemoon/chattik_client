<template>
  <main class="auth main">
    <create-new-password-form></create-new-password-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateNewPasswordForm from "@/components/forms/CreateNewPasswordForm.vue";

export default defineComponent({
  name: "CreateNewPassword",
  components: { CreateNewPasswordForm },
});
</script>
