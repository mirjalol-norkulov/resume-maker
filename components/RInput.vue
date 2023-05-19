<template>
  <div :class="input({ color, size, fullWidth })">
    <input
      class="bg-transparent inline-block w-full outline-none"
      v-bind="$attrs"
      :value="modelValue"
      @input="(event) => $emit('update:model-value', event.target?.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

withDefaults(
  defineProps<{
    fullWidth?: boolean;
    modelValue?: string | number | undefined;
    color?: "transparent" | "slate";
    size?: "sm" | "md" | "lg";
  }>(),
  {
    fullWidth: false,
    color: "slate",
    size: "md",
  }
);

const emit = defineEmits(["update:model-value"]);

const input = tv({
  base: "rounded inline-flex relative text-black after:(content-none absolute left-0 bottom-0 block w-full h-0.5 bg-primary transform scale-x-0 opacity-0 transition-all duration-300) focus-within:after:(scale-x-100 opacity-100)",
  variants: {
    color: {
      transparent: "bg-transparent",
      slate: "bg-slate-100",
    },
    size: {
      sm: "text-sm px-3 h-8",
      md: "text-base px-4 h-10",
      lg: "text-xl px-4 h-12",
    },
    fullWidth: { true: "w-full" },
  },
  defaultVariants: {
    size: "md",
    color: "slate",
  },
});
</script>
