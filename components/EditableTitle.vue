<template>
  <div ref="el" class="editable-title flex items-center group">
    <r-input
      v-model="innerValue"
      class="font-bold !px-0"
      full-width
      size="lg"
      color="transparent"
      :disabled="!isEditing"
      @keyup.enter="handleSave"
      @keyup.esc="handleCancel"
      @blur="handleCancel"
      :style="{ width }"
    />
    <button
      class="focus:outline-none bg-transparent hover:text-primary opacity-0 cursor-pointer transition-all duration-300 group-hover:opacity-100 group-hover:text-primary"
      @click="handleEnableEdit"
    >
      <div class="i-ri-pencil-line h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
}>();
const emit = defineEmits(["update:model-value"]);

const el = ref();
const isEditing = ref(false);
const innerValue = ref<string | undefined>("");

const handleSave = () => {
  emit("update:model-value", innerValue.value);
  isEditing.value = false;
};

const handleCancel = () => {
  isEditing.value = false;
  innerValue.value = props.modelValue;
};

const handleEnableEdit = () => {
  isEditing.value = true;
  nextTick(() => {
    const input = el.value.querySelector("input");
    if (input) {
      input.select();
    }
  });
};

const width = computed(() => {
  return `${innerValue.value?.length || 0 + 1}ch`;
});

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val;
  },
  { immediate: true }
);
</script>
