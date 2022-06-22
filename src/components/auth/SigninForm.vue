<template>
  <a-form class="auth-form" @submit.prevent="signin">
    <h1 class="mb-5">{{ $t("pages.signin.title") }}</h1>
    <a-form-item class="mb-3">
      <a-input
        v-model:value="user.email"
        :placeholder="$t('pages.signin.email_placeholder')"
        size="large"
        :class="{
          'error-field':
            (v$.user.email.$dirty && v$.user.email.$invalid) ||
            invalidSigninDataError,
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
        <span class="error-message" v-else-if="invalidSigninDataError">{{
          invalidSigninDataError?.text
        }}</span>
      </Transition>
    </a-form-item>
    <a-form-item class="mb-1">
      <a-input-password
        v-model:value="user.password"
        :placeholder="$t('pages.signin.password_placeholder')"
        size="large"
        :class="{
          'error-field':
            (v$.user.password.$dirty && v$.user.password.$invalid) ||
            invalidSigninDataError,
        }"
      >
        <template #prefix>
          <lock-two-tone></lock-two-tone>
        </template>
      </a-input-password>
      <Transition name="fade">
        <span
          class="error-message"
          v-if="v$.user.password.$dirty && v$.user.password.$invalid"
          >{{ $t("validation.password_required") }}</span
        >
        <span class="error-message" v-else-if="invalidSigninDataError">{{
          invalidSigninDataError?.text
        }}</span>
      </Transition>
    </a-form-item>
    <a-form-item class="auth-recover mb-1">
      <router-link to="/recover-password">{{
        $t("pages.signin.recover_password_link")
      }}</router-link>
    </a-form-item>
    <a-form-item class="mb-2">
      <a-button
        :loading="isPendingRequest"
        type="primary"
        html-type="submit"
        size="large"
        >{{ $t("pages.signin.button_text") }}</a-button
      >
    </a-form-item>
    <a-form-item class="mb-0">
      <router-link to="/signup">{{
        $t("pages.signin.link_signup")
      }}</router-link>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from "vue";
import { Button, Form, FormItem, Input, InputPassword } from "ant-design-vue";
import { MailTwoTone, LockTwoTone } from "@ant-design/icons-vue";
import { email as emailValidator, required } from "@vuelidate/validators";
import { useStore } from "@/store";
import { IAPIError, IError, Namespaces } from "@/store/modules/root/root.types";
import useVuelidate from "@vuelidate/core";

export default defineComponent({
  name: "SigninForm",
  components: {
    AForm: Form,
    AFormItem: FormItem,
    AInput: Input,
    AButton: Button,
    AInputPassword: InputPassword,
    MailTwoTone,
    LockTwoTone,
  },
  setup() {
    const user = ref({
      email: "",
      password: "",
    });
    const store = useStore();

    const rules = {
      user: {
        email: { required, emailValidator },
        password: { required },
      },
    };

    const v$ = useVuelidate(rules, { user });

    const signin = async () => {
      await v$.value.$validate();
      if (!v$.value.$invalid) {
        await store.dispatch("auth/signin", user.value);
      }
    };

    const apiErrors: ComputedRef<IError> = computed(() =>
      store.getters.errorByNamespace(Namespaces.AUTH_NAMESPACE_SIGNIN, 400)
    );

    const invalidSigninDataError: ComputedRef<IAPIError | undefined> = computed(
      () =>
        apiErrors.value?.message.find(
          (message: IAPIError) => message.type === "invalid_data"
        )
    );

    const isPendingRequest: ComputedRef<boolean | undefined> = computed(() =>
      store.getters.loadingByNamespace(Namespaces.AUTH_NAMESPACE_SIGNIN)
    );

    return {
      user,
      v$,
      invalidSigninDataError,
      isPendingRequest,
      signin,
    };
  },
});
</script>
