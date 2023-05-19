<template>
  <div>
    <div class="w-1/2 rounded">
      <img
        ref="imageRef"
        :src="modelValue.originalImage"
        alt="Avatar"
        class="block max-w-full rounded"
      />
    </div>

    <r-button
      class="absolute right-2 bottom-2"
      color="primary"
      @click="handleSave"
    >
      Save changes
    </r-button>
  </div>
</template>

<script setup lang="ts">
import Cropper from "cropperjs";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["save", "update:model-value"]);

const imageRef = ref();

let cropper: Cropper | null = null;

onMounted(() => {
  cropper = new Cropper(imageRef.value, {
    autoCrop: true,
    data: props.modelValue.data,
  });
});

const handleSave = () => {
  if (!cropper) {
    return;
  }
  const croppedImage = cropper.getCroppedCanvas().toDataURL();
  emit("update:model-value", {
    ...props.modelValue,
    croppedImage,
    data: cropper.getData(),
  });

  emit("save");
};
</script>
