<template>
  <DynamicItem>
    <template #header>
      <h1 class="font-bold">{{ innerItem.jobTitle || "(Not specified)" }}</h1>
      <span class="text-sm">
        {{ innerItem.interval.start }} - {{ innerItem.interval.end }}
      </span>
    </template>
    <div class="grid grid-cols-2 gap-4">
      <r-form-item label="Job title" full-width>
        <r-input full-width v-model="innerItem.jobTitle" />
      </r-form-item>
      <r-form-item label="Employer" full-width>
        <r-input full-width v-model="innerItem.employer" />
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
        <RichTextEditor v-model="innerItem.description" />
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
