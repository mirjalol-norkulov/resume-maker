<template>
  <dynamic-item v-bind="$attrs" v-on="$listeners">
    <div slot="header">
      <h1 class="font-bold">{{ innerItem.language || "(Not specified)" }}</h1>
      <span class="text-sm text-blue-gray-500">
        {{ CONSTANTS.LANGUAGE_LEVELS[item.level] }}
      </span>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <r-form-item label="Language" full-width>
        <r-input full-width v-model="innerItem.language" />
      </r-form-item>
      <r-form-item label="Level" full-width>
        <r-select
          v-model="innerItem.level"
          :items="languageLevels"
          item-key="key"
          item-label="value"
        >
        </r-select>
      </r-form-item>
    </div>
  </dynamic-item>
</template>

<script>
import DynamicItem from "@/components/DynamicItem";
import RFormItem from "@/components/ui/RFormItem";
import RInput from "@/components/ui/RInput";
import RSelect from "@/components/ui/RSelect";
import CONSTANTS from "@/constants";

export default {
  name: "LanguagesSectionItem",
  components: { RInput, RFormItem, DynamicItem, RSelect },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      innerItem: undefined,
      levels: ["Native speaker", "Highly proficient", "Very good command"],
      CONSTANTS,
    };
  },
  computed: {
    languageLevels() {
      return Object.entries(CONSTANTS.LANGUAGE_LEVELS).map(([key, value]) => ({
        key,
        value,
      }));
    },
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
