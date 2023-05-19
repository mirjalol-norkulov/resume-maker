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

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    fullWidth?: boolean;
  }>(),
  { fullWidth: false }
);
</script>
