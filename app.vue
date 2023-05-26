<script setup lang="ts">
import "@unocss/reset/tailwind-compat.css";
import "cropperjs/dist/cropper.min.css";
import "vue-toastification/dist/index.css";

import "~/assets/main.css";
</script>

<template>
  <div class="font-sans antialiased text-black">
    <NuxtLayout> <NuxtPage /></NuxtLayout>
  </div>
</template>
