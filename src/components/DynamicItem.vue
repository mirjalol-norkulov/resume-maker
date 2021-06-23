<template>
  <div class="py-2 group border border-solid border-true-gray-200 rounded">
    <header
      class="
        relative
        flex
        items-center
        justify-between
        cursor-pointer
        px-4
        py-2
      "
      @click="handleToggleCollapse"
    >
      <button
        class="
          focus:outline-none
          absolute
          right-full
          top-1/2
          transform
          -translate-y-1/2
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
      <r-button
        variant="text"
        class="
          absolute
          left-full
          top-1/2
          transform
          -translate-y-1/2
          px-1
          transition-opacity
          opacity-0
          group-hover:opacity-100
          text-blue-gray-300
        "
        @click="handleDelete"
      >
        <delete-outline-icon class="w-5 h-5" />
      </r-button>
      <div>
        <slot name="header" />
      </div>
      <span class="text-true-gray-400">
        <chevron-down-icon v-if="!isExpanded" class="w-6 h-6" />
        <chevron-up-icon v-else class="w-6 h-6" />
      </span>
    </header>
    <main>
      <r-collapse class="px-4" :collapsed="!isExpanded">
        <slot />
      </r-collapse>
    </main>
  </div>
</template>

<script>
import RCollapse from "@/components/ui/RCollapse";
import DragIndicatorIcon from "@/assets/svg/drag_indicator.svg";
import ChevronDownIcon from "@/assets/svg/chevron-down.svg";
import ChevronUpIcon from "@/assets/svg/chevron-up.svg";
import DeleteOutlineIcon from "@/assets/svg/delete_outline.svg";
import RButton from "@/components/ui/RButton";

export default {
  name: "DynamicItem",
  props: {
    dragHandleClass: {
      type: String,
      default: "",
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    RButton,
    RCollapse,
    DragIndicatorIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    DeleteOutlineIcon,
  },
  data() {
    return { isExpanded: true };
  },
  watch: {
    expanded: {
      immediate: true,
      handler(newValue) {
        this.isExpanded = newValue;
      },
    },
  },
  methods: {
    handleToggleCollapse() {
      this.isExpanded = !this.isExpanded;
      this.$emit("update:expanded", this.isExpanded);
    },
    handleDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style scoped></style>
