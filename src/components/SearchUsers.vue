<template>
  <a-auto-complete
    type="search"
    style="width: 100%"
    dropdown-class-name="sidebar__search--autocomplete"
    @search="searchUsers"
    @change="checkEmptySearchInput"
    @select="selectUser"
    :options="searchedUsers"
    v-model:value.trim="searchString"
    :placeholder="$t('layouts.main.sidebar.search_placeholder')"
  >
    <template #option="item">
      <div class="searched-user">
        <user-avatar
          class="mr-1"
          :user="item"
          :size="24"
          :show-status="false"
        ></user-avatar>
        {{ item.username }}
      </div>
    </template>
  </a-auto-complete>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { IUserInfo } from "@/store/modules/users/users.types";
import { AutoComplete } from "ant-design-vue";
import UserAvatar from "@/components/UserAvatar.vue";
import debounce from "@/helpers";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SearchUsers",
  components: {
    AAutoComplete: AutoComplete,
    UserAvatar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const searchString = ref("");

    const searchUsers = debounce(() => {
      if (/[a-zA-Z0-9\\.]{3,}/.test(searchString.value)) {
        store.dispatch("users/searchUsers", searchString.value);
      }
    }, 200);

    const searchedUsers = computed(() => store.getters["users/searchedUsers"]);

    const checkEmptySearchInput = () => {
      if (searchString.value === "") {
        store.commit("users/UPDATE_SEARCHED_USERS", []);
      }
    };

    const selectUser = async (username: string) => {
      store.commit("users/UPDATE_SEARCHED_USERS", [
        store.getters["users/searchedUsers"].find(
          (user: IUserInfo) => user.username === username
        ),
      ]);
      await router.push({ path: `/im/@${username}` });
    };

    return {
      searchString,
      searchedUsers,
      searchUsers,
      checkEmptySearchInput,
      selectUser,
    };
  },
});
</script>
