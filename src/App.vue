<template>
  <div class="wrapper">
    <div class="alerts">
      <TransitionGroup name="slide-fade" mode="in-out">
        <a-alert
          class="mb-2"
          v-for="alert in alerts"
          closable
          @close="removeAlert(alert.id)"
          :key="alert.id"
          :message="alert.message"
          :description="alert.description"
          :type="alert.type"
          :show-icon="alert.showIcon"
        >
          <template #icon
            ><component :is="alert.iconName"></component
          ></template>
        </a-alert>
      </TransitionGroup>
    </div>
    <Transition name="slide-fade" mode="out-in">
      <component :is="layout"></component>
    </Transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { Alert } from "ant-design-vue";
import {
  SmileOutlined,
  FrownOutlined,
  RobotOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "@/store";
import EmptyLayout from "@/layouts/Empty.vue";
import MainLayout from "@/layouts/Main.vue";

export default defineComponent({
  components: {
    EmptyLayout,
    MainLayout,
    AAlert: Alert,
    SmileOutlined,
    FrownOutlined,
    RobotOutlined,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const layout = computed(() => `${route.meta.layout || "empty"}-layout`);

    const alerts = computed(() => store.getters.alerts);
    const removeAlert = (id: number) => {
      store.commit("REMOVE_ALERT", id);
    };
    return {
      layout,
      alerts,
      removeAlert,
    };
  },
});
</script>
