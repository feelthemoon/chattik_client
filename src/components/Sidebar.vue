<template>
  <aside class="sidebar">
    <header class="sidebar__header">
      <div class="sidebar__header-left">
        <a-dropdown :trigger="['hover']">
          <a-button @click.prevent shape="circle">
            <template #icon>
              <menu-outlined></menu-outlined>
            </template>
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="(item, index) in menuItems" :key="index">
                <router-link :to="item.to">
                  <component :is="item.icon" class="mr-2"></component>
                  <span>{{ item.title }}</span>
                </router-link>
              </a-menu-item>
              <a-menu-item disabled>
                <span class="mr-2">
                  {{ $t("layouts.main.sidebar.theme_text") }}
                </span>
                <a-switch v-model:checked="isDarkTheme">
                  <template #unCheckedChildren>
                    <icon name="light-theme" width="16px" height="22px"></icon>
                  </template>
                  <template #checkedChildren>
                    <icon name="dark-theme" width="16px" height="22px"></icon>
                  </template>
                </a-switch>
              </a-menu-item>
              <a-menu-item disabled>
                <a-button danger type="text" :style="{ width: '100%' }">
                  <template #icon><close-outlined></close-outlined></template>
                  <span> {{ $t("layouts.main.sidebar.logout_text") }} </span>
                </a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="sidebar__search ml-5">
        <a-input
          type="search"
          :placeholder="$t('layouts.main.sidebar.search_placeholder')"
        >
          <template #prefix>
            <search-outlined></search-outlined>
          </template>
        </a-input>
      </div>
    </header>
    <section class="sidebar__dialogs">
      <sidebar-dialog v-for="i in 15" :key="i"></sidebar-dialog>
    </section>
  </aside>
</template>

<script lang="ts">
import {
  Input,
  Button,
  Dropdown,
  Menu,
  MenuItem,
  Switch,
} from "ant-design-vue";
import {
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
  SaveOutlined,
  TeamOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Icon from "@/components/Icon.vue";
import SidebarDialog from "@/components/SidebarDialog.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarDialog,
    AInput: Input,
    AButton: Button,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: MenuItem,
    ASwitch: Switch,
    MenuOutlined,
    SearchOutlined,
    SettingOutlined,
    SaveOutlined,
    TeamOutlined,
    CloseOutlined,
    Icon,
  },
  setup() {
    const { t } = useI18n();
    const menuItems = [
      {
        title: t("layouts.main.sidebar.saved_text"),
        icon: "save-outlined",
        to: "/im/fav",
      },
      {
        title: t("layouts.main.sidebar.settings_text"),
        icon: "setting-outlined",
        to: "/settings",
      },
      {
        title: t("layouts.main.sidebar.contacts_text"),
        icon: "team-outlined",
        to: "/contacts",
      },
    ];
    const isDarkTheme = ref(false);

    return {
      menuItems,
      isDarkTheme,
    };
  },
});
</script>
