<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog :open="modelValue" class="relative z-10" @close="handleClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel as="div" class="relative" @close="handleClose">
              <slot />
              <button
                v-if="showClose"
                class="absolute top-4 right-4 z-10 outline-none"
                @click="handleClose"
              >
                <div class="i-mdi-close w-6 h-6 text-white" />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

withDefaults(
  defineProps<{
    modelValue?: boolean;
    showClose?: boolean;
  }>(),
  {
    modelValue: false,
    showClose: false,
  }
);
const emit = defineEmits(["update:model-value"]);
const handleClose = () => {
  emit("update:model-value", false);
};
</script>
