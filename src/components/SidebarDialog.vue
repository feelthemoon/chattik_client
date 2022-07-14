<template>
  <article class="sidebar__dialog">
    <router-link :to="`/im/${dialog?.id}`">
      <div class="sidebar__dialog-left">
        <a-badge class="sidebar__dialog-online-status" dot status="default">
          <a-avatar
            class="sidebar__dialog-avatar"
            :size="50"
            :class="{
              [randomGradientClass]: randomGradientClass,
            }"
            >A</a-avatar
          >
        </a-badge>
      </div>
      <div class="sidebar__dialog-center">
        <h4 class="sidebar__dialog-title">Lorem ipsum dolor sit amet.</h4>
        <p class="sidebar__dialog-message mb-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
          numquam.
        </p>
      </div>
      <div class="sidebar__dialog-right">
        <time class="sidebar__dialog-datetime">01.01.2020</time>
        <span class="sidebar__dialog-status">
          <icon width="15px" height="11px" name="message-read"></icon>
        </span>
      </div>
    </router-link>
  </article>
</template>

<script lang="ts">
import { Avatar, Badge } from "ant-design-vue";
import { defineComponent } from "vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "SidebarDialog",
  props: {
    dialog: {
      type: Object,
    },
  },
  components: {
    Icon,
    AAvatar: Avatar,
    ABadge: Badge,
  },
  setup() {
    const randomGradientClass = `gradient-${Math.floor(Math.random() * 8 + 1)}`;
    return {
      randomGradientClass,
    };
  },
});
</script>
