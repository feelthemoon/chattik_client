<template>
  <div class="text-message">
    <p class="message__text mb-0 message__content">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut
      commodi, debitis deleniti eos incidunt ipsa ipsum laboriosam minus
      mollitia nostrum, nulla officiis optio perferendis totam ullam vel.
      Aliquid, itaque?
    </p>
    <div class="message__attachments">
      <div
        class="attachment"
        v-for="(attachment, i) in firstThreeAttachments"
        :key="i"
      >
        <img
          :src="attachment.src"
          :alt="attachment.filename"
          v-if="attachment.type === 'image'"
        />
        <component
          :is="attachment.type || 'unknown'"
          :style="{ fontSize: '2em' }"
          v-else
        ></component>
      </div>
      <a-button
        type="text"
        class="attachment--other ml-1"
        v-if="otherAttachments"
      >
        +{{ otherAttachments.length }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Button } from "ant-design-vue";
import {
  FileOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileZipOutlined,
  FileMarkdownOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "TextMessage",
  components: {
    Unknown: FileOutlined,
    Excel: FileExcelOutlined,
    Word: FileWordOutlined,
    Ppt: FilePptOutlined,
    Pdf: FilePdfOutlined,
    Text: FileTextOutlined,
    Zip: FileZipOutlined,
    Markdown: FileMarkdownOutlined,
    AButton: Button,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const firstThreeAttachments = computed(() =>
      props.message.attachments?.slice(0, 3)
    );
    const otherAttachments = computed(() =>
      props.message.attachments?.slice(3, props.message.attachments.length)
    );

    return {
      firstThreeAttachments,
      otherAttachments,
    };
  },
});
</script>
