<template>
  <main class="auth main">
    <signup-form @show-verify="showVerify"></signup-form>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import SignupForm from "@/components/forms/SignupForm.vue";

export default defineComponent({
  name: "Signup",
  components: { SignupForm },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const showVerify = () => {
      route.meta.verify = true;
      router.push({ name: "VerifyAccount" });
    };

    return {
      showVerify,
    };
  },
});
</script>
