<template>
  <div class="audio-message">
    <audio :src="audioAttachment?.src"></audio>
    <div class="audio-message__track">
      <div class="audio-message__cover"></div>
      <div class="audio-message__controls">
        <a-button shape="circle">
          <template #icon>
            <play-circle-filled></play-circle-filled>
          </template>
        </a-button>
        <div class="audio-message__shape ml-5 mr-5">
          <icon name="audio-shape" width="109px" height="30px"></icon>
        </div>
        <span class="audio-message__duration">00:19</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Button } from "ant-design-vue";
import { PlayCircleFilled } from "@ant-design/icons-vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "AudioMessage",
  components: {
    Icon,
    AButton: Button,
    PlayCircleFilled,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const audioAttachment = computed(() => props.message.attachments[0]);

    return {
      audioAttachment,
    };
  },
});
</script>
