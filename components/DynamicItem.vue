<script setup lang="ts">
defineProps({
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

const isExpanded = defineModel("expanded", { type: Boolean });

const handleToggleCollapse = () => {
  isExpanded.value = !isExpanded.value;
};
const handleDelete = () => {
  emit("delete");
};
</script>

<template>
  <div class="py-2 group border border-solid border-neutral-200 rounded">
    <header
      class="relative flex items-center justify-between cursor-pointer px-4 py-2"
      @click="handleToggleCollapse"
    >
      <button
        class="focus:outline-none bg-transparent absolute right-full top-1/2 transform -translate-y-1/2 text-slate-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        :class="dragHandleClass"
      >
        <Icon name="i-ri-draggable" :size="24" />
      </button>
      <r-button
        variant="text"
        class="absolute left-full top-1/2 transform -translate-y-1/2 px-1 transition-opacity opacity-0 group-hover:opacity-100 text-slate-300"
        @click="handleDelete"
      >
        <Icon name="i-material-symbols-delete-outline" :size="20" />
      </r-button>
      <div>
        <slot name="header" />
      </div>
      <div class="text-neutral-400">
        <Icon
          name="i-mdi-chevron-down"
          :size="24"
          class="transform transition duration-300"
          :class="{ 'rotate-180': expanded }"
        />
      </div>
    </header>
    <main>
      <r-collapse class="px-4" :open="!isExpanded">
        <slot />
      </r-collapse>
    </main>
  </div>
</template>
