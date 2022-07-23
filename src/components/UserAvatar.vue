<template>
  <div class="user-avatar">
    <a-avatar
      :size="size"
      :class="{
        [randomGradientClass]: randomGradientClass,
      }"
      >{{ user.username[0].toUpperCase() }}</a-avatar
    >
    <span
      v-if="showStatus"
      class="user-avatar__status user-avatar__status--online"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IUserInfo } from "@/store/modules/users/users.types";
import { Avatar } from "ant-design-vue";

export default defineComponent({
  name: "UserAvatar",
  components: {
    AAvatar: Avatar,
  },
  props: {
    user: {
      type: Object as PropType<IUserInfo>,
      required: true,
    },
    size: {
      type: Number as PropType<number>,
      default: () => 50,
    },
    showStatus: {
      type: Boolean as PropType<boolean>,
      default: () => true,
    },
  },
  setup() {
    const randomGradientClass = `gradient-${Math.floor(Math.random() * 8 + 1)}`;
    return {
      randomGradientClass,
    };
  },
});
</script>
