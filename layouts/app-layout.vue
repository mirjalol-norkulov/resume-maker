<script lang="ts" setup></script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header
      class="bg-white h-20 flex items-center border-b border-solid border-gray-200"
    >
      <div class="container mx-auto px-4 flex items-center justify-between">
        <NuxtLink to="/app" class="flex items-center space-x-2">
          <LogoTip class="w-9 h-9" />
          <span>Resume maker</span>
        </NuxtLink>
        <UserDropdown />
      </div>
    </header>
    <slot />
  </div>
</template>
