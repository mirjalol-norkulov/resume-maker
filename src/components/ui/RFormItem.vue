<template>
  <div :class="{ 'w-full': fullWidth }">
    <div
      v-if="label"
      class="block mb-1 font-semibold text-gray-500 text-sm capitalize"
    >
      {{ label }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "RFormItem",
  props: {
    label: {
      type: String,
      default: undefined,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
