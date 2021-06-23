<template>
  <div
    class="r-select-option"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleClick"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  name: "RSelectOption",
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    label: {
      type: [String],
      default: undefined,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.r-select-option {
  @apply px-4 py-2 text-sm cursor-pointer transition-all duration-200 select-none;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>
