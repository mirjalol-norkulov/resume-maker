<template>
  <div class="my-4">
    <h3 class="font-bold mb-1">{{ item.language }}</h3>
    <div class="w-96 bg-gray-300 h-1 relative">
      <div
        class="absolute left-0 top-0 h-1 bg-indigo-900"
        :style="{ width: levelWidth }"
      ></div>
    </div>
  </div>
</template>

<script>
import CONSTANTS from "@/constants";
export default {
  name: "LanguageItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      CONSTANTS,
    };
  },
  computed: {
    levelWidth() {
      const index = Object.keys(CONSTANTS.LANGUAGE_LEVELS).indexOf(
        this.item.level
      );

      return `${100 / (index + 1)}%`;
    },
  },
};
</script>

<style scoped></style>
