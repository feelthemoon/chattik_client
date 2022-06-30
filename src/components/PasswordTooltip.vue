<template>
  <a-tooltip placement="left" trigger="focus" color="white">
    <template #title>
      <p
        class="password-check"
        v-for="(check, index) in passwordChecks"
        :key="index"
      >
        <check-circle-two-tone
          :style="{ fontSize: '18px' }"
          v-if="check.checker"
          two-tone-color="#52c41a"
        ></check-circle-two-tone>
        <close-circle-two-tone
          two-tone-color="red"
          :style="{ fontSize: '18px' }"
          v-else
        ></close-circle-two-tone>
        <span class="password-check__text ml-1">{{ check.text }}</span>
      </p>
    </template>
    <slot></slot>
  </a-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons-vue";
import { Tooltip } from "ant-design-vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "PasswordTooltip",
  props: {
    password: {
      type: String,
      required: true,
    },
  },
  components: {
    ATooltip: Tooltip,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
  },
  setup(props) {
    const { t } = useI18n();

    const passwordChecks = ref([
      {
        text: t("validation.password_lowercase"),
        checker: computed(() => /[a-z]/.test(props.password)),
      },
      {
        text: t("validation.password_uppercase"),
        checker: computed(() => /[A-Z]/.test(props.password)),
      },
      {
        text: t("validation.password_numeric"),
        checker: computed(() => /\d/.test(props.password)),
      },
      {
        text: t("validation.password_minlength"),
        checker: computed(() => props.password.length >= 8),
      },
    ]);

    return {
      passwordChecks,
    };
  },
});
</script>
