<template>
  <button :class="button({ variant, color, fullWidth, size })">
    <span
      v-if="loading"
      class="inline-block w-4 h-4 i-svg-spinners-ring-resize"
    />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

withDefaults(
  defineProps<{
    variant?: "default" | "text" | "link";
    fullWidth?: boolean;
    color?: "default" | "primary";
    loading?: boolean;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    variant: "default",
    fullWidth: false,
    color: "default",
    loading: false,
    size: "md",
  }
);

const button = tv({
  base: "inline-flex items-center transition-all duration-300 focus:outline-none rounded",
  variants: {
    variant: {
      default: "px-4 py-2 focus:ring-1 ring-offset-2",
      text: "hover:text-primary",
      link: "text-primary font-semibold transition-colors duration-300 hover:bg-primary-light px-4 py-1.5",
    },
    fullWidth: {
      true: "w-full text-center justify-center",
    },
    color: {
      default: "ring-slate-300",
      primary: "bg-primary text-white ring-primary",
    },
    size: {
      sm: "text-sm px-3 h-8",
      md: "text-base px-4 h-10",
      lg: "text-xl px-4 h-12",
    },
  },
});
</script>
