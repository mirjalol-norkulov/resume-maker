<template>
  <DynamicSection
    class="bg-white"
    hint="You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website"
    :section="section"
  >
    <template
      #item="{ item, deleteItem, updateItem, addItem, expandChange, expanded }"
    >
      <WebsiteLinksItem
        :item="item"
        :key="item.id"
        class="mb-3"
        :expanded="expanded"
        @delete="deleteItem(item)"
        @update:item="updateItem(item)"
        @update:expanded="(isExpanded) => expandChange(isExpanded, item)"
      />
    </template>
    <r-button variant="link" full-width class="mt-2" @click="handleAddItem">
      <div class="i-material-symbols-add w-5 h-5" />
      Add link
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
    label: "",
    link: "",
    rendererComponent: "website-item-renderer",
  };
  emit("update:section", {
    ...props.section,
    items: [...props.section.items, newItem],
  });
};
</script>
