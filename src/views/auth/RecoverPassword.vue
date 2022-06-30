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
            'error-field':
              (v$.email.$dirty && v$.email.$invalid) || invalidEmail,
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
          <span class="error-message" v-else-if="invalidEmail">{{
            invalidEmail?.text
          }}</span>
        </Transition>
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="isPendingRequest"
          type="primary"
          html-type="submit"
          size="large"
          >{{ $t("pages.recover.button_text") }}</a-button
        >
      </a-form-item>
    </a-form>
  </main>
</template>

<script lang="ts">
import { Button, Form, FormItem, Input } from "ant-design-vue";
import { MailTwoTone } from "@ant-design/icons-vue";
import { computed, ComputedRef, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { required, email as emailValidateRule } from "@vuelidate/validators";
import { useReCaptcha } from "vue-recaptcha-v3";
import useVuelidate from "@vuelidate/core";
import { IAPIError, IError, Namespaces } from "@/store/modules/root/root.types";

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

    const reCaptcha = useReCaptcha();

    const apiErrors: ComputedRef<IError> = computed(() =>
      store.getters.errorByNamespace(Namespaces.AUTH.NAMESPACE_RECOVER, 400)
    );
    const invalidEmail: ComputedRef<IAPIError | undefined> = computed(() =>
      apiErrors.value?.message.find(
        (message) => message.type === "invalid_email"
      )
    );

    const isPendingRequest: ComputedRef<boolean | undefined> = computed(() =>
      store.getters.loadingByNamespace(Namespaces.AUTH.NAMESPACE_RECOVER)
    );
    const recover = async () => {
      await v$.value.$validate();
      if (!v$.value.$invalid) {
        await reCaptcha?.recaptchaLoaded();
        const recaptchaToken = await reCaptcha?.executeRecaptcha(
          "recoverPassword"
        );
        await store.dispatch("auth/recover", {
          email: email.value,
          recaptchaToken,
        });
      }
    };

    const v$ = useVuelidate(rules, { email });

    return {
      email,
      v$,
      invalidEmail,
      isPendingRequest,
      recover,
    };
  },
});
</script>
