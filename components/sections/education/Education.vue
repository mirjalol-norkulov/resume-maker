<template>
  <dynamic-section
    class="bg-white"
    hint="If relevant, include your most recent educational achievements and the dates here"
    :section="section"
    v-bind="$attrs"
  >
    <template #item="{ item, deleteItem, updateItem, expandChange, expanded }">
      <EducationItem
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
      Add education
    </r-button>
  </dynamic-section>
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
    school: "",
    degree: "",
    interval: {
      start: "Jun, 2021",
      end: "Jun, 2021",
    },
    city: "",
    description: "",
    rendererComponent: "education-item-renderer",
  };
  emit("update:section", {
    ...props.section,
    items: [...props.section.items, newItem],
  });
};
</script>
