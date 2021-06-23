<template>
  <dynamic-section
    class="bg-white"
    :section="section"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #item="{ item, deleteItem, updateItem, expandChange, expanded }">
      <education-item
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
      <add-icon class="w-5 h-5" /> Add education
    </r-button>
  </dynamic-section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import DynamicSection from "@/components/DynamicSection";
import RButton from "@/components/ui/RButton";
import AddIcon from "@/assets/svg/add.svg";
import EducationItem from "@/components/sections/education/EducationItem";

export default {
  name: "Education",
  components: {
    EducationItem,
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
  data() {
    return {
      dragging: false,
      innerValue: undefined,
      currentExpandedItemId: null,
    };
  },
  methods: {
    handleAddItem() {
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
        rendererComponent: "education-item",
      };
      this.$emit("update:section", {
        ...this.section,
        items: [...this.section.items, newItem],
      });
    },
    handleCollapseItem(isExpanded, item) {
      this.currentExpandedItemId = isExpanded ? item.id : null;
    },
    handleUpdateItem(item) {
      this.innerValue.items = this.innerValue.items.map((i) =>
        i.id === item.id ? item : i
      );
    },
    handleDeleteItem(item) {
      this.innerValue.items = this.innerValue.items.filter(
        ({ id }) => id !== item.id
      );
    },
  },
};
</script>
