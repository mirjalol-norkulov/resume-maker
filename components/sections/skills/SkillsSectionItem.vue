<template>
  <DynamicItem>
    <template #header>
      <h1 class="font-bold">{{ innerItem.skill || "(Not specified)" }}</h1>
    </template>
    <div class="grid grid-cols-2 gap-4">
      <r-form-item label="Skill" full-width>
        <r-input full-width v-model="innerItem.skill" />
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
