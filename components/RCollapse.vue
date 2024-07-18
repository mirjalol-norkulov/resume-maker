<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from "radix-vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
  }>(),
  { open: true },
);

const isOpen = defineModel("open", { type: Boolean });
</script>

<template>
  <CollapsibleRoot v-model:open="isOpen">
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
