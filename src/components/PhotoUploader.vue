<template>
  <div>
    <div
      class="flex items-center cursor-pointer"
      @click="isModalVisible = true"
    >
      <div
        class="
          flex
          items-center
          justify-center
          bg-blue-gray-100
          w-12
          h-12
          rounded
        "
      >
        <img
          v-if="innerValue.croppedImage"
          :src="innerValue.croppedImage"
          alt="Avatar"
          class="w-full h-full object-cover rounded"
        />
        <man-icon v-else class="text-blue-gray-300 w-7 h-7" />
      </div>
      <div v-if="innerValue.croppedImage" class="flex flex-col pl-2">
        <r-button variant="text">
          <pencil-icon />
          Edit photo
        </r-button>
        <r-button variant="text" @click.stop="handleDelete">
          <delete-icon class="w-5 h-5" />
          Delete
        </r-button>
      </div>
      <span v-else class="ml-3 text-sm text-primary hover:text-primary-darker">
        Upload photo
      </span>
    </div>
    <r-modal
      :visible="isModalVisible"
      close-on-click-overlay
      close-on-escape
      show-close
      @close="handleModalClose"
    >
      <div class="modal-content">
        <div
          class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-blue-gray-900
          "
        >
          <div v-if="!innerValue.originalImage">
            <input
              type="file"
              class="hidden"
              :id="id"
              @change="handleInputChange"
            />
            <label
              :for="id"
              class="
                inline-flex
                cursor-pointer
                bg-primary
                px-4
                py-2
                text-white text-sm
                capitalize
                rounded
              "
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

<script>
import { v4 as uuidv4 } from "uuid";
import ManIcon from "@/assets/svg/man.svg";
import RModal from "@/components/ui/RModal";
import RButton from "@/components/ui/RButton";
import PhotoEditor from "@/components/PhotoEditor";
import PencilIcon from "@/assets/svg/pencil.svg";
import DeleteIcon from "@/assets/svg/delete_outline.svg";

function getDefaultValues() {
  return {
    croppedImage: null,
    originalImage: null,
    data: null,
  };
}

export default {
  name: "PhotoUploader",
  props: {
    value: {
      type: Object,
      required: false,
      default: () => getDefaultValues(),
    },
  },
  components: { PhotoEditor, RButton, RModal, ManIcon, PencilIcon, DeleteIcon },
  data() {
    return {
      file: null,
      isModalVisible: false,
      innerValue: getDefaultValues(),
    };
  },
  computed: {
    id() {
      return uuidv4();
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.innerValue = newValue;
      },
    },
  },
  created() {
    if (!this.value) {
      this.$emit("input", this.getDefaultValues());
    }
  },
  methods: {
    handleInputChange(event) {
      [this.file] = event.target.files;
      const imageDataUrl = URL.createObjectURL(this.file);
      this.innerValue = { ...this.innerValue, originalImage: imageDataUrl };
      this.$emit("input", this.innerValue);
    },
    handleInnerValueChange() {
      this.$emit("input", this.innerValue);
    },
    handleSave() {
      this.$emit("input", this.innerValue);
      this.isModalVisible = false;
    },
    handleDelete() {
      this.file = null;
      this.innerValue = this.getDefaultValues();
      this.$emit("input", this.innerValue);
    },
    handleModalClose() {
      this.isModalVisible = false;
      if (!this.innerValue.croppedImage && !this.innerValue.data) {
        this.innerValue = this.getDefaultValues();
        this.file = null;
      }
    },
    getDefaultValues,
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  width: 640px;
  padding-top: 640px;
  position: relative;
}
</style>
