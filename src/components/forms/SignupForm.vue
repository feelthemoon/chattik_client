<template>
  <a-form class="auth-form" @submit.prevent="signup">
    <h1 class="mb-5">{{ $t("pages.signup.title") }}</h1>
    <a-form-item class="mb-3">
      <a-input
        v-model:value.trim="user.email"
        :placeholder="$t('common.email_placeholder')"
        size="large"
        :class="{
          'error-field':
            (v$.user.email.$dirty && v$.user.email.$invalid) ||
            invalidEmailError,
        }"
      >
        <template #prefix>
          <mail-two-tone></mail-two-tone>
        </template>
      </a-input>
      <Transition name="fade">
        <span
          class="error-message"
          v-if="v$.user.email.$dirty && v$.user.email.$invalid"
          >{{ $t("validation.email_invalid") }}</span
        >
        <span class="error-message" v-else-if="invalidEmailError">{{
          invalidEmailError?.text
        }}</span>
      </Transition>
    </a-form-item>
    <a-form-item class="mb-3">
      <a-input
        v-model:value.trim="user.username"
        :placeholder="$t('common.username_placeholder')"
        size="large"
        show-count
        :maxlength="25"
        :class="{
          'error-field':
            (v$.user.username.$dirty && v$.user.username.$invalid) ||
            invalidUsernameError,
        }"
      >
        <template #prefix>
          <idcard-two-tone></idcard-two-tone>
        </template>
      </a-input>
      <Transition name="fade">
        <span
          class="error-message"
          v-if="v$.user.username.$dirty && v$.user.username.$invalid"
          >{{ $t("validation.username_invalid") }}</span
        >
        <span class="error-message" v-else-if="invalidUsernameError">{{
          invalidUsernameError?.text
        }}</span>
      </Transition>
    </a-form-item>
    <a-form-item class="mb-3">
      <password-tooltip :password="user.password">
        <a-input-password
          v-model:value.trim="user.password"
          :placeholder="$t('common.password_placeholder')"
          size="large"
          :class="{
            'error-field': v$.user.password.$dirty && v$.user.password.$invalid,
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
          v-if="v$.user.password.$dirty && v$.user.password.$invalid"
          >{{ $t("validation.password_invalid") }}</span
        >
      </Transition>
    </a-form-item>
    <a-form-item class="mb-1">
      <a-button
        :loading="isPendingRequest"
        type="primary"
        html-type="submit"
        size="large"
        >{{ $t("pages.signup.button_text") }}</a-button
      >
    </a-form-item>
    <a-form-item class="mb-0">
      <router-link to="/signin">{{
        $t("pages.signup.link_signin")
      }}</router-link>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from "vue";
import { Button, Form, FormItem, Input, InputPassword } from "ant-design-vue";
import { MailTwoTone, LockTwoTone, IdcardTwoTone } from "@ant-design/icons-vue";
import {
  email as emailValidator,
  required,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { useStore } from "@/store";
import { IAPIError, IError, Namespaces } from "@/store/modules/root/root.types";
import { useReCaptcha } from "vue-recaptcha-v3";
import useVuelidate from "@vuelidate/core";
import PasswordTooltip from "@/components/PasswordTooltip.vue";

export default defineComponent({
  name: "SignupForm",
  components: {
    PasswordTooltip,
    AForm: Form,
    AFormItem: FormItem,
    AInput: Input,
    AButton: Button,
    AInputPassword: InputPassword,
    MailTwoTone,
    LockTwoTone,
    IdcardTwoTone,
  },
  setup(_, { emit }) {
    const user = ref({
      email: "",
      username: "",
      password: "",
    });

    const store = useStore();
    const token: ComputedRef<string> = computed(() => store.getters.token);

    const validationPassword = helpers.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,255})/
    );

    const rules = {
      user: {
        email: { required, emailValidator },
        password: { required, validationPassword },
        username: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(255),
        },
      },
    };

    const v$ = useVuelidate(rules, { user });
    const reCaptcha = useReCaptcha();

    const signup = async () => {
      await v$.value.$validate();
      if (!v$.value.$invalid) {
        await reCaptcha?.recaptchaLoaded();
        const recaptchaToken = await reCaptcha?.executeRecaptcha("signup");
        await store.dispatch("auth/signup", { ...user.value, recaptchaToken });
        if (token.value) {
          emit("showVerify");
        }
      }
    };

    const apiErrors: ComputedRef<IError> = computed(() =>
      store.getters.errorByNamespace(Namespaces.AUTH_NAMESPACE_SIGNUP, 400)
    );

    const invalidEmailError: ComputedRef<IAPIError | undefined> = computed(() =>
      apiErrors.value?.message.find(
        (message: IAPIError) => message.type === "invalid_data_email"
      )
    );

    const invalidUsernameError: ComputedRef<IAPIError | undefined> = computed(
      () =>
        apiErrors.value?.message.find(
          (message: IAPIError) => message.type === "invalid_data_username"
        )
    );

    const isPendingRequest: ComputedRef<boolean | undefined> = computed(() =>
      store.getters.loadingByNamespace(Namespaces.AUTH_NAMESPACE_SIGNUP)
    );

    return {
      user,
      v$,
      invalidEmailError,
      invalidUsernameError,
      isPendingRequest,
      signup,
    };
  },
});
</script>
