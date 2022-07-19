<template>
  <div class="file-message">
    <div class="file-message__top">
      <div class="file-message__info">
        <span class="file-message__filename">SideBar.jsx</span>
        <span class="file-message__filesize"
          >{{ $t("components.file_message.file_size") }}: 13kb.</span
        >
      </div>
      <div class="file-message__icon">
        <component :is="fileIcon" :style="{ fontSize: '2.5em' }"></component>
      </div>
    </div>
    <a
      target="_blank"
      :href="message.attachments[0].src"
      class="file-message__download"
    >
      <download-outlined></download-outlined>
      {{ $t("components.file_message.download_text") }}
    </a>
  </div>
</template>

<script lang="ts">
import { Button } from "ant-design-vue";
import { computed, defineComponent } from "vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
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
  name: "FileMessage",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  components: {
    AButton: Button,
    DownloadOutlined,
    Unknown: FileOutlined,
    Excel: FileExcelOutlined,
    Word: FileWordOutlined,
    Ppt: FilePptOutlined,
    Pdf: FilePdfOutlined,
    Text: FileTextOutlined,
    Zip: FileZipOutlined,
    Markdown: FileMarkdownOutlined,
  },
  setup(props) {
    const fileIcon = computed(
      () => props.message.attachments[0].type ?? "unknown"
    );

    return {
      fileIcon,
    };
  },
});
</script>
