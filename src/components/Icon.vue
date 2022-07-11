<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ width, height }"
  >
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: () => "17px",
    },
    height: {
      type: String,
      default: () => "17px",
    },
  },
  setup(props) {
    const iconPath = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      let icon = require(`@/assets/static/icons/${props.name}.svg`);

      if (Object.prototype.hasOwnProperty.call(icon, "default")) {
        icon = icon.default;
      }

      return icon.url ? icon.url : `#${icon.id}`;
    });
    const className = computed(() => "svg-icon svg-icon-" + props.name);

    return { iconPath, className };
  },
});
</script>
