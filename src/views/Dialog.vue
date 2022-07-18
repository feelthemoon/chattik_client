<template>
  <div class="dialog">
    <header class="dialog__header">
      <div class="space"></div>
      <div class="dialog__user-info">
        <router-link to="to">
          <h5 class="dialog__user-username mb-0">dassdsads</h5>
        </router-link>
        <div class="dialog__user-status">
          <a-badge dot status="success" text="online"></a-badge>
        </div>
      </div>
      <div class="dialog__options">
        <a-button>
          <template #icon>
            <ellipsis-outlined></ellipsis-outlined>
          </template>
        </a-button>
      </div>
    </header>
    <section class="dialog__messages" ref="dialogMessages">
      <message :message="{ type: 'text', isMine: true }"></message>
      <message :message="{ type: 'text' }" v-for="i in 20" :key="i"></message>
      <message
        :message="{ type: 'audio', attachments: [{ src: '' }], isMine: false }"
      ></message>
      <message
        :message="{
          type: 'file',
          attachments: [{ src: '', type: 'pdf' }],
          isMine: true,
        }"
      ></message>
      <message
        :message="{
          type: 'file',
          attachments: [{ src: '', type: 'pdf' }],
          isMine: false,
        }"
      ></message>
    </section>
    <section class="dialog__actions">
      <send-message></send-message>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Button, Badge } from "ant-design-vue";
import { EllipsisOutlined } from "@ant-design/icons-vue";
import Message from "@/components/messages/Message.vue";
import SendMessage from "@/components/SendMessage.vue";

export default defineComponent({
  name: "Dialog",
  components: {
    SendMessage,
    Message,
    AButton: Button,
    ABadge: Badge,
    EllipsisOutlined,
  },
  setup() {
    const dialogMessages = ref({});
    onMounted(() => {
      if (dialogMessages.value instanceof Element) {
        dialogMessages.value.scrollTo(0, dialogMessages.value.scrollHeight);
      }
    });
    return {
      dialogMessages,
    };
  },
});
</script>
