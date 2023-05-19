<template>
  <div>
    <div
      class="flex items-center cursor-pointer"
      @click="isModalVisible = true"
    >
      <div
        class="flex items-center justify-center bg-slate-100 w-12 h-12 rounded"
      >
        <img
          v-if="innerValue?.croppedImage"
          :src="innerValue?.croppedImage"
          alt="Avatar"
          class="w-full h-full object-cover rounded"
        />
        <div v-else class="i-local-man text-slate-300 w-7 h-7" />
      </div>
      <div v-if="innerValue?.croppedImage" class="flex flex-col pl-2">
        <r-button variant="text">
          <div class="i-material-symbols-edit" />
          Edit photo
        </r-button>
        <r-button variant="text" @click.stop="handleDelete">
          <div class="i-material-symbols-delete-outline w-5 h-5" />
          Delete
        </r-button>
      </div>
      <span v-else class="ml-3 text-sm text-primary hover:text-primary-darker">
        Upload photo
      </span>
    </div>
    <r-modal v-model="isModalVisible" show-close>
      <div class="modal-content">
        <div
          class="absolute inset-0 flex items-center justify-center bg-slate-900"
        >
          <div v-if="!innerValue?.originalImage">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              class="hidden"
              :id="id"
              @change="handleInputChange"
            />
            <label
              :for="id"
              class="inline-flex cursor-pointer bg-primary px-4 py-2 text-white text-sm capitalize rounded"
            >
              Choose image
            </label>
          </div>
          <photo-editor
            v-else
            v-model="innerValue"
            @input="handleInnerValueChange"
            @save="handleSave"
          />
        </div>
      </div>
    </r-modal>
  </div>
</template>

<script lang="ts">
export interface ModelValue {
  croppedImage?: any;
  originalImage?: any;
  data?: any;
}

function getDefaultValues() {
  return {
    croppedImage: null,
    originalImage: null,
    data: null,
  };
}
</script>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";

const props = withDefaults(
  defineProps<{
    modelValue?: ModelValue | undefined | null;
  }>(),
  { modelValue: () => getDefaultValues() }
);
const emit = defineEmits(["update:model-value"]);

const file = ref<Blob | MediaSource | null>(null);
const isModalVisible = ref(false);
const innerValue = ref<ModelValue | undefined>(getDefaultValues());
const id = uuidv4();

if (!props.modelValue) {
  emit("update:model-value", getDefaultValues());
}

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  },
  { immediate: true }
);

const handleInputChange = (event: any) => {
  [file.value] = event.target.files;
  if (file.value) {
    const imageDataUrl = URL.createObjectURL(file.value);
    innerValue.value = { ...innerValue.value, originalImage: imageDataUrl };
    emit("update:model-value", innerValue.value);
  }
};

const handleInnerValueChange = () => {
  emit("update:model-value", innerValue.value);
};

const handleSave = () => {
  emit("update:model-value", innerValue.value);
  isModalVisible.value = false;
};
const handleDelete = () => {
  file.value = null;
  innerValue.value = getDefaultValues();
  emit("update:model-value", innerValue.value);
};
const handleModalClose = () => {
  isModalVisible.value = false;
  if (!innerValue.value?.croppedImage && !innerValue.value?.data) {
    innerValue.value = getDefaultValues();
    file.value = null;
  }
};
</script>

<style scoped>
.modal-content {
  width: 640px;
  padding-top: 640px;
  position: relative;
}
</style>
