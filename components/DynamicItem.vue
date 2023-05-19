<template>
  <div class="py-2 group border border-solid border-neutral-200 rounded">
    <header
      class="relative flex items-center justify-between cursor-pointer px-4 py-2"
      @click="handleToggleCollapse"
    >
      <button
        class="focus:outline-none absolute right-full top-1/2 transform -translate-y-1/2 text-slate-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        :class="dragHandleClass"
      >
        <div class="i-material-symbols-drag-indicator w-6 h-6" />
      </button>
      <r-button
        variant="text"
        class="absolute left-full top-1/2 transform -translate-y-1/2 px-1 transition-opacity opacity-0 group-hover:opacity-100 text-slate-300"
        @click="handleDelete"
      >
        <div class="i-material-symbols-delete-outline w-5 h-5" />
      </r-button>
      <div>
        <slot name="header" />
      </div>
      <span class="text-neutral-400">
        <div
          class="i-mdi-chevron-down w-6 h-6 transform"
          :class="{ 'rotate-180': expanded }"
        />
      </span>
    </header>
    <main>
      <r-collapse class="px-4" :collapsed="!isExpanded">
        <slot />
      </r-collapse>
    </main>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dragHandleClass: {
    type: String,
    default: "",
  },
  expanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:expanded", "delete"]);

const isExpanded = ref(true);

watch(
  () => props.expanded,
  (newValue) => {
    isExpanded.value = newValue;
  },
  { immediate: true }
);

const handleToggleCollapse = () => {
  isExpanded.value = !isExpanded.value;
  emit("update:expanded", isExpanded.value);
};
const handleDelete = () => {
  emit("delete");
};
</script>
