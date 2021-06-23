<template>
  <div v-if="innerSection" v-bind="$attrs" v-on="$listeners">
    <div class="flex items-center group relative">
      <button
        class="
          focus:outline-none
          absolute
          right-full
          text-blue-gray-300
          transition-opacity
          duration-300
          opacity-0
          group-hover:opacity-100
        "
        :class="dragHandleClass"
      >
        <drag-indicator-icon class="w-6 h-6" />
      </button>
      <editable-title v-model="innerSection.title" />
    </div>
    <div class="text-sm text-blue-gray-500">{{ innerSection.hint }}</div>

    <div class="mt-3">
      <draggable
        v-model="innerSection.items"
        handle=".item-drag-handle"
        :animation="200"
        :disabled="false"
        group="employment-history"
        @start="dragging = true"
        @end="dragging = false"
      >
        <transition-group
          type="transition"
          :move-class="dragging ? 'transition-transform duration-500' : ''"
        >
          <template v-for="item in innerSection.items">
            <slot
              name="item"
              :item="item"
              :add-item="handleAddItem"
              :update-item="handleUpdateItem"
              :delete-item="handleDeleteItem"
              :expand-change="handleItemExpandChange"
              :expanded="currentExpandedItemId === item.id"
            />
          </template>
        </transition-group>
      </draggable>
      <slot />
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import EditableTitle from "@/components/EditableTitle";
import DragIndicatorIcon from "@/assets/svg/drag_indicator.svg";

export default {
  name: "DynamicSection",
  components: { EditableTitle, DragIndicatorIcon, draggable },
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

<style scoped></style>
