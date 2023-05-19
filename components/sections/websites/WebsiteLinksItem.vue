<template>
  <DynamicItem>
    <template #header>
      <h1 class="font-bold">{{ innerItem.label || "(Not specified)" }}</h1>
      <span class="text-sm">
        {{ innerItem.link }}
      </span>
    </template>
    <div class="grid grid-cols-2 gap-4">
      <r-form-item label="Link" full-width>
        <r-input full-width v-model="innerItem.label" />
      </r-form-item>
      <r-form-item label="URL" full-width>
        <r-input full-width v-model="innerItem.link" />
      </r-form-item>
    </div>
  </DynamicItem>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:item"]);

const innerItem = ref();

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
