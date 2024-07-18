<script setup lang="ts">
import { tv } from "tailwind-variants";

withDefaults(
  defineProps<{
    fullWidth?: boolean;
    modelValue?: string | number | undefined;
    color?: "transparent" | "slate";
    size?: "sm" | "md" | "lg";
    clearable?: boolean;
  }>(),
  {
    fullWidth: false,
    color: "slate",
    size: "md",
    clearable: false,
  },
);

const emit = defineEmits(["update:model-value"]);

const model = defineModel("modelValue");

const input = tv({
  base: "rounded inline-flex items-center relative text-black after:(content-none rounded-b absolute left-0 bottom-0 block w-full h-0.5 bg-primary transform scale-x-0 opacity-0 transition-all duration-300) focus-within:after:(scale-x-100 opacity-100)",
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

const handleClear = () => {
  model.value = "";
};
</script>

<template>
  <div :class="input({ color, size, fullWidth })">
    <input
      v-model="model"
      v-bind="$attrs"
      class="bg-transparent inline-block w-full outline-none self-stretch"
    />
    <button
      v-if="clearable"
      type="button"
      tabindex="-1"
      class="flex items-center bg-transparent outline-none transition duration-300"
      :class="[modelValue ? 'scale-100' : 'scale-0']"
      @click="handleClear"
    >
      <Icon name="i-material-symbols-close" class="inline-block" :size="16" />
    </button>
  </div>
</template>
