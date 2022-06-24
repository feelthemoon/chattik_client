<template>
  <main class="auth main">
    <a-form class="auth-form" @submit.prevent="recover">
      <h1 class="mb-5">{{ $t("pages.recover.title") }}</h1>
      <a-form-item class="mb-3">
        <a-input
          v-model:value.trim="email"
          :placeholder="$t('common.email_placeholder')"
          size="large"
          :class="{
            'error-field': v$.email.$dirty && v$.email.$invalid,
          }"
        >
          <template #prefix>
            <mail-two-tone></mail-two-tone>
          </template>
        </a-input>
        <Transition name="fade">
          <span
            class="error-message"
            v-if="v$.email.$dirty && v$.email.$invalid"
            >{{ $t("validation.email_invalid") }}</span
          >
        </Transition>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large">{{
          $t("pages.recover.button_text")
        }}</a-button>
      </a-form-item>
    </a-form>
  </main>
</template>

<script lang="ts">
import { Button, Form, FormItem, Input } from "ant-design-vue";
import { MailTwoTone } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { required, email as emailValidateRule } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default defineComponent({
  name: "RecoverPassword",
  components: {
    AForm: Form,
    AFormItem: FormItem,
    AInput: Input,
    AButton: Button,
    MailTwoTone,
  },
  setup() {
    const store = useStore();
    const email = ref("");

    const rules = {
      email: { required, emailValidateRule },
    };

    const recover = async () => {
      await v$.value.$validate();
      if (!v$.value.$invalid) {
        await store.dispatch("auth/recover", email.value);
      }
    };

    const v$ = useVuelidate(rules, { email });

    return {
      email,
      v$,
      recover,
    };
  },
});
</script>
