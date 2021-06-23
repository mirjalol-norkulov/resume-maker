<template>
  <div>
    <div class="w-1/2 rounded">
      <img
        ref="image"
        :src="value.originalImage"
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

<script>
import Cropper from "cropperjs";
import RButton from "@/components/ui/RButton";
export default {
  name: "PhotoEditor",
  components: { RButton },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.cropper = new Cropper(this.$refs.image, {
      autoCrop: true,
      data: this.value.data,
    });
  },
  methods: {
    handleSave() {
      const croppedImage = this.cropper.getCroppedCanvas().toDataURL();
      this.$emit("input", {
        ...this.value,
        croppedImage,
        data: this.cropper.getData(),
      });
      this.$emit("save");
    },
  },
};
</script>

<style scoped></style>
