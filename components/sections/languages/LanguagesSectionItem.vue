<template>
  <DynamicItem>
    <template #header>
      <h1 class="font-bold">{{ innerItem.language || "(Not specified)" }}</h1>
      <span class="text-sm text-slate-500">
        {{ CONSTANTS.LANGUAGE_LEVELS[item.level] }}
      </span>
    </template>
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
  </DynamicItem>
</template>

<script setup lang="ts">
import CONSTANTS from "~/constants";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:item"]);
const innerItem = ref();

const languageLevels = Object.entries(CONSTANTS.LANGUAGE_LEVELS).map(
  ([key, value]) => ({
    key,
    value,
  })
);

watch(
  () => props.item,
  (newValue) => {
    innerItem.value = newValue;
  },
  { immediate: true }
);

watch(innerItem, (newValue) => {
  emit("update:item", newValue);
});
</script>
