<script setup lang="ts">
import "@unocss/reset/tailwind-compat.css";
import "cropperjs/dist/cropper.min.css";
import "vue-toastification/dist/index.css";
import { ConfigProvider } from "radix-vue";

import "~/assets/main.css";

const useIdFunction = () => useId();
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div class="font-sans antialiased text-black">
      <NuxtLayout> <NuxtPage /></NuxtLayout>
    </div>
  </ConfigProvider>
</template>
