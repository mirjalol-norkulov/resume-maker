<template>
  <DynamicItem>
    <template #header>
      <h1 class="font-bold">{{ innerItem.school || "(Not specified)" }}</h1>
      <span class="text-sm">
        {{ innerItem.interval?.start }} - {{ innerItem.interval?.end }}
      </span>
    </template>
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
    if (newValue) {
      innerItem.value = newValue;
    } else {
      emit("update:item", {
        school: "",
        degree: "",
        city: "",
        description: "",
        interval: { start: "", end: "" },
      });
    }
  },
  { immediate: true }
);
watch(innerItem, () => {
  emit("update:item", innerItem.value);
});
</script>
