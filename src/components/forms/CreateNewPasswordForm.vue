<template>
  <a-form class="auth-form" @submit.prevent="createNewPassword">
    <h1 class="mb-5">{{ $t("pages.new-password.title") }}</h1>
    <a-form-item class="mb-3">
      <password-tooltip :password="formData.newPassword">
        <a-input-password
          v-model:value.trim="formData.newPassword"
          :placeholder="$t('pages.new-password.new_password_placeholder')"
          size="large"
          :class="{
            'error-field': v$.newPassword.$dirty && v$.newPassword.$invalid,
          }"
        >
          <template #prefix>
            <lock-two-tone></lock-two-tone>
          </template>
        </a-input-password>
      </password-tooltip>
      <Transition name="fade">
        <span
          class="error-message"
          v-if="v$.newPassword.$dirty && v$.newPassword.$invalid"
          >{{ $t("validation.password_invalid") }}</span
        >
      </Transition>
    </a-form-item>
    <a-form-item class="mb-1">
      <a-input-password
        v-model:value.trim="formData.passwordConfirm"
        :placeholder="$t('pages.new-password.confirm_password_placeholder')"
        size="large"
        :class="{
          'error-field':
            v$.passwordConfirm.$dirty && v$.passwordConfirm.$invalid,
        }"
      >
        <template #prefix>
          <lock-two-tone></lock-two-tone>
        </template>
      </a-input-password>
      <Transition name="fade">
        <span
          class="error-message"
          v-if="v$.passwordConfirm.$dirty && v$.passwordConfirm.$invalid"
          >{{ $t("validation.password_confirm_invalid") }}</span
        >
      </Transition>
    </a-form-item>
    <a-form-item class="mb-2">
      <a-button
        :loading="isPendingRequest"
        type="primary"
        html-type="submit"
        size="large"
        >{{ $t("pages.new-password.button_text") }}</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from "vue";
import { Button, Form, FormItem, InputPassword } from "ant-design-vue";
import { LockTwoTone } from "@ant-design/icons-vue";
import { useStore } from "@/store";
import { helpers, required } from "@vuelidate/validators";
import { Namespaces } from "@/store/modules/root/root.types";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
import useVuelidate from "@vuelidate/core";
import PasswordTooltip from "@/components/PasswordTooltip.vue";

export default defineComponent({
  name: "CreateNewPasswordForm",
  components: {
    AForm: Form,
    AFormItem: FormItem,
    AButton: Button,
    AInputPassword: InputPassword,
    LockTwoTone,
    PasswordTooltip,
  },
  setup() {
    const formData = ref({
      newPassword: "",
      passwordConfirm: "",
    });
    const store = useStore();
    const route = useRoute();

    const validationPassword = helpers.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,255})/
    );

    const rules = {
      newPassword: { required, validationPassword },
      passwordConfirm: {
        sameAs: () =>
          formData.value.newPassword === formData.value.passwordConfirm,
      },
    };

    const v$ = useVuelidate(rules, formData);
    const reCaptcha = useReCaptcha();

    const createNewPassword = async () => {
      await v$.value.$validate();
      if (!v$.value.$invalid) {
        await reCaptcha?.recaptchaLoaded();
        const recaptchaToken = await reCaptcha?.executeRecaptcha("newPassword");

        await store.dispatch("users/createNewPassword", {
          data: { ...formData.value, recaptchaToken },
          recoverToken: route.query.token,
        });
      }
    };
    const isPendingRequest: ComputedRef<boolean | undefined> = computed(() =>
      store.getters.loadingByNamespace(Namespaces.USER_NAMESPACE_NEW_PASSWORD)
    );

    return {
      formData,
      v$,
      isPendingRequest,
      createNewPassword,
    };
  },
});
</script>
