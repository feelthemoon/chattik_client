<template>
  <div class="sendmessage" :class="{ focus: isTextAreaFocused }">
    <div class="sendmessage__left">
      <a-button type="primary" shape="circle">
        <template #icon>
          <smile-outlined></smile-outlined>
        </template>
      </a-button>
    </div>
    <a-textarea
      @focus="isTextAreaFocused = true"
      @blur="isTextAreaFocused = false"
      class="sendmessage__textarea"
      :placeholder="$t('pages.dialog.textarea_placeholder')"
    ></a-textarea>
    <div class="sendmessage__right">
      <a-button type="primary" shape="circle">
        <template #icon>
          <paper-clip-outlined></paper-clip-outlined>
        </template>
      </a-button>
      <a-button type="primary" shape="circle" class="mr-1 ml-1">
        <template #icon>
          <audio-outlined></audio-outlined>
        </template>
      </a-button>
      <a-button type="primary" shape="circle">
        <template #icon>
          <rocket-outlined></rocket-outlined>
        </template>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  SmileOutlined,
  PaperClipOutlined,
  AudioOutlined,
  RocketOutlined,
} from "@ant-design/icons-vue";
import { Button, Textarea } from "ant-design-vue";

export default defineComponent({
  name: "SendMessage",
  components: {
    SmileOutlined,
    PaperClipOutlined,
    AudioOutlined,
    RocketOutlined,
    AButton: Button,
    ATextarea: Textarea,
  },
  setup() {
    const isTextAreaFocused = ref(false);

    return {
      isTextAreaFocused,
    };
  },
});
</script>
