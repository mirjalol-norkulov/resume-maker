<template>
  <div class="editable-title flex items-center group">
    <r-input
      class="text-xl"
      :input-props="{
        class: 'p-0 font-bold',
        disabled: !isEditing,
      }"
      @keyup.enter="handleSave"
      @keyup.esc="handleCancel"
      @blur="handleCancel"
      :style="{ width }"
      v-model="innerValue"
    />
    <button
      class="
        focus:outline-none
        hover:text-primary
        opacity-0
        cursor-pointer
        transition-opacity transition-colors
        duration-300
        group-hover:opacity-100 group-hover:text-primary;
      "
      @click="handleEnableEdit"
    >
      <pencil-icon />
    </button>
  </div>
</template>

<script>
import RInput from "@/components/ui/RInput";
import PencilIcon from "@/assets/svg/pencil.svg";

export default {
  name: "EditableTitle",
  components: { RInput, PencilIcon },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      width: 0,
      isEditing: false,
      innerValue: "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.updateWidth();
        this.innerValue = val;
      },
    },
  },
  methods: {
    handleSave() {
      this.$emit("input", this.innerValue);
      this.isEditing = false;
    },
    handleCancel() {
      this.isEditing = false;
      this.innerValue = this.value;
    },
    handleEnableEdit() {
      this.isEditing = true;
      this.$nextTick(() => {
        const input = this.$el.querySelector("input");
        if (input) {
          input.select();
        }
      });
    },
    updateWidth() {
      this.width = `${this.value.length + 1}ch`;
    },
  },
};
</script>

<style scoped lang="scss">
.editable-title {
  &::v-deep {
    .r-input {
      background-color: white !important;
    }
  }
}
</style>
