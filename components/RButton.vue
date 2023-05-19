<template>
  <button :class="button({ variant, color, fullWidth })" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

withDefaults(
  defineProps<{
    variant?: "default" | "text" | "link";
    fullWidth?: boolean;
    color?: "default" | "primary";
  }>(),
  {
    variant: "default",
    fullWidth: false,
    color: "default",
  }
);

const button = tv({
  base: "inline-flex items-center focus:outline-none rounded",
  variants: {
    variant: {
      default:
        "transition-all duration-300 px-4 py-2 focus:ring-1 ring-offset-2",
      text: "hover:text-primary",
      link: "text-primary font-semibold transition-colors duration-300 hover:bg-primary-light px-4 py-1.5",
    },
    fullWidth: {
      true: "w-full",
    },
    color: {
      default: "ring-slate-300",
      primary: "bg-primary text-white ring-primary",
    },
  },
});
</script>
