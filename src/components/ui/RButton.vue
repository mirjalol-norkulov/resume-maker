<template>
  <button
    class="inline-flex items-center focus:outline-none rounded"
    :class="{
      'w-full': fullWidth,
      'transition-all duration-300 px-4 py-2 focus:ring-1 ring-offset-2':
        variant === 'default',
      'hover:text-primary': variant === 'text',
      'text-primary font-semibold transition-colors duration-300 hover:bg-primary-light px-4 py-1.5':
        variant === 'link',
      'ring-blue-gray-300': color === 'default',
      'bg-primary text-white ring-primary': color === 'primary',
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "RButton",
  props: {
    variant: {
      type: String,
      default: "default",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "default",
    },
  },
};
</script>

<style scoped></style>
