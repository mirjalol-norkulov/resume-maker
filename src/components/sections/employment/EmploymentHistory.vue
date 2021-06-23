<template>
  <dynamic-section
    class="bg-white"
    :section="section"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #item="{ item, deleteItem, updateItem, expandChange, expanded }">
      <employment-history-item
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
      <add-icon class="w-5 h-5" /> Add employment
    </r-button>
  </dynamic-section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import DynamicSection from "@/components/DynamicSection";
import RButton from "@/components/ui/RButton";
import AddIcon from "@/assets/svg/add.svg";
import EmploymentHistoryItem from "@/components/sections/employment/EmploymentHistoryItem";
export default {
  name: "EmploymentHistory",
  components: {
    EmploymentHistoryItem,
    RButton,
    DynamicSection,
    AddIcon,
  },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleAddItem() {
      const newItem = {
        id: uuidv4(),
        jobTitle: "",
        employer: "",
        interval: {
          start: "Jun, 2021",
          end: "Jun, 2021",
        },
        city: "",
        description: "",
        rendererComponent: "employment-item",
      };
      this.$emit("update:section", {
        ...this.section,
        items: [...this.section.items, newItem],
      });
    },
  },
};
</script>
