<template>
  <article class="sidebar__dialog">
    <router-link :to="`/im/@${dialog?.user.username}`">
      <div class="sidebar__dialog-left">
        <user-avatar :user="{ username: 'aaaa' }"></user-avatar>
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
import { defineComponent } from "vue";
import Icon from "@/components/Icon.vue";
import UserAvatar from "@/components/UserAvatar.vue";

export default defineComponent({
  name: "SidebarDialog",
  props: {
    dialog: {
      type: Object,
    },
  },
  components: {
    UserAvatar,
    Icon,
  },
});
</script>
