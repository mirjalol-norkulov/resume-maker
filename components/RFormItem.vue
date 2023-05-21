<template>
  <div :class="{ 'w-full': fullWidth }">
    <div
      v-if="label"
      class="block mb-1 font-semibold text-gray-500 text-sm capitalize"
    >
      {{ label }}
    </div>
    <slot />

    <p
      v-if="showError"
      class="mt-1 h-5 text-sm text-red-5 transition duration-300"
      :class="[errorMessage ? 'opacity-100' : 'opacity-0']"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    fullWidth?: boolean;
    showError?: boolean;
    errorMessage?: string;
  }>(),
  { fullWidth: false, showError: false }
);
</script>
