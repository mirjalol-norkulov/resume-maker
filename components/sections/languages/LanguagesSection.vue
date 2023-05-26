<template>
  <DynamicSection class="bg-white" :section="section">
    <template #item="{ item, deleteItem, updateItem, expandChange, expanded }">
      <LanguagesSectionItem
        :item="item"
        :key="item.id"
        class="mb-3"
        :expanded="expanded"
        @delete="deleteItem(item)"
        @update:item="updateItem(item)"
        @update:expanded="(isExpanded: boolean) => expandChange(isExpanded, item)"
      />
    </template>
    <r-button variant="link" full-width class="mt-2" @click="handleAddItem">
      <div class="i-material-symbols-add w-5 h-5" />
      Add language
    </r-button>
  </DynamicSection>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:section"]);

const handleAddItem = () => {
  const newItem = {
    id: uuidv4(),
    language: "",
    level: "",
    rendererComponent: "language-item-renderer",
  };
  emit("update:section", {
    ...props.section,
    items: [...props.section.items, newItem],
  });
};
</script>
