<template>
  <dynamic-item v-bind="$attrs" v-on="$listeners">
    <div slot="header">
      <h1 class="font-bold">{{ innerItem.school || "(Not specified)" }}</h1>
      <span class="text-sm">
        {{ innerItem.interval.start }} - {{ innerItem.interval.end }}
      </span>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <r-form-item label="School" full-width>
        <r-input full-width v-model="innerItem.school" />
      </r-form-item>
      <r-form-item label="Degree" full-width>
        <r-input full-width v-model="innerItem.degree" />
      </r-form-item>
      <r-form-item label="Start & End date" full-width>
        <div class="grid grid-cols-2 gap-x-4">
          <r-input full-width v-model="innerItem.interval.start" />
          <r-input full-width v-model="innerItem.interval.end" />
        </div>
      </r-form-item>
      <r-form-item label="City" full-width>
        <r-input full-width v-model="innerItem.city" />
      </r-form-item>
      <r-form-item label="Description" full-width class="col-span-2">
        <rich-text-editor v-model="innerItem.description" />
      </r-form-item>
    </div>
  </dynamic-item>
</template>

<script>
import DynamicItem from "@/components/DynamicItem";
import RFormItem from "@/components/ui/RFormItem";
import RInput from "@/components/ui/RInput";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default {
  name: "EducationItem",
  components: { RichTextEditor, RInput, RFormItem, DynamicItem },
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
