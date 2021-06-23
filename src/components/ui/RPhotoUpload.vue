<template>
  <div>
    <input type="file" class="hidden" :id="id" />
    <label :for="id" class="flex items-center cursor-pointer">
      <span class="block bg-blue-gray-100 p-3.5 rounded">
        <man-icon class="text-blue-gray-300 w-7 h-7" />
      </span>
      <span class="ml-3 text-sm text-primary hover:text-primary-darker">
        Upload photo
      </span>
    </label>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import ManIcon from "@/assets/svg/man.svg";

export default {
  name: "RPhotoUpload",
  components: { ManIcon },
  computed: {
    id() {
      return uuidv4();
    },
  },
};
</script>
