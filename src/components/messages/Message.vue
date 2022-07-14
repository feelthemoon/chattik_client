<template>
  <div class="message" :class="{ notMine: message.notMine }">
    <div class="message__top">
      <a-avatar
        :size="35"
        class="message__user-avatar"
        :class="{
          [randomGradientClass]: randomGradientClass,
        }"
        >A</a-avatar
      >
      <component :is="messageType"></component>
    </div>
    <div class="message__datetime">
      <time>Вчера, 15:50</time>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Avatar } from "ant-design-vue";
import { useRoute } from "vue-router";
import TextMessage from "@/components/messages/Text.vue";

export default defineComponent({
  name: "Message",
  components: {
    AAvatar: Avatar,
    TextMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const messageType = `${props.message.type || "text"}-message`;
    const randomGradientClass = route.meta.randomGradientClass;

    return {
      messageType,
      randomGradientClass,
    };
  },
});
</script>
