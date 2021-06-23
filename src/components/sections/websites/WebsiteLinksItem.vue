<template>
  <dynamic-item v-bind="$attrs" v-on="$listeners">
    <div slot="header">
      <h1 class="font-bold">{{ innerItem.label || "(Not specified)" }}</h1>
      <span class="text-sm">
        {{ innerItem.link }}
      </span>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <r-form-item label="Link" full-width>
        <r-input full-width v-model="innerItem.label" />
      </r-form-item>
      <r-form-item label="URL" full-width>
        <r-input full-width v-model="innerItem.link" />
      </r-form-item>
    </div>
  </dynamic-item>
</template>

<script>
import DynamicItem from "@/components/DynamicItem";
import RFormItem from "@/components/ui/RFormItem";
import RInput from "@/components/ui/RInput";

export default {
  name: "WebsiteLinksItem",
  components: { RInput, RFormItem, DynamicItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      innerItem: undefined,
    };
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.innerItem = newValue;
      },
    },
    innerItem: {
      handler(newValue) {
        this.$emit("update:item", newValue);
      },
    },
  },
};
</script>

<style scoped></style>
