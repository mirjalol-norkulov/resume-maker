<template>
  <div v-if="innerSection" v-bind="$attrs">
    <div class="flex items-center group relative">
      <button
        class="focus:outline-none absolute right-full text-slate-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        :class="dragHandleClass"
      >
        <div class="i-material-symbols-drag-indicator w-6 h-6" />
      </button>
      <EditableTitle v-model="innerSection.title" />
    </div>
    <div class="text-sm text-slate-500">{{ innerSection.hint }}</div>
    <div class="mt-3">
      <draggable
        v-model="innerSection.items"
        item-key="id"
        group="employment-history"
        animation="250"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element: item }">
          <div>
            <slot
              name="item"
              :item="item"
              :add-item="handleAddItem"
              :update-item="handleUpdateItem"
              :delete-item="handleDeleteItem"
              :expand-change="handleItemExpandChange"
              :expanded="currentExpandedItemId === item.id"
            />
          </div>
        </template>
      </draggable>
      <slot />
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DynamicSection",
  props: {
    section: {
      type: Object,
      required: true,
    },
    dragHandleClass: {
      type: String,
      default: "",
    },
  },
  components: { draggable },
  data() {
    return {
      dragging: false,
      innerSection: undefined,
      currentExpandedItemId: null,
    };
  },
  watch: {
    section: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.innerSection = newValue;
      },
    },
  },
  methods: {
    handleAddItem(item) {
      if (!this.innerSection.items) {
        this.innerSection.items = [];
      }
      this.innerSection.items.push(item);
      this.emitUpdateSection();
    },
    handleItemExpandChange(isExpanded, item) {
      this.currentExpandedItemId = isExpanded ? item.id : null;
    },
    handleUpdateItem(item) {
      this.innerSection.items = this.innerSection.items.map((i) =>
        i.id === item.id ? item : i
      );
      this.emitUpdateSection();
    },
    handleDeleteItem(item) {
      this.innerSection.items = this.innerSection.items.filter(
        ({ id }) => id !== item.id
      );
      this.emitUpdateSection();
    },
    emitUpdateSection() {
      this.$emit("update:section", this.innerSection);
    },
  },
};
</script>
