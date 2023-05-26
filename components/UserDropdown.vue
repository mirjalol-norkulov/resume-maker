<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  navigateTo("/auth/sign-in");
};

const name = computed(() => {
  return user.value?.user_metadata.full_name;
});
const avatar = computed(() => user.value?.user_metadata.avatar_url);
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm bg-white space-x-2"
      >
        <img :src="avatar" class="w-7 h-7 rounded-full" :alt="name" />
        <span>{{ name }}</span>
        <div
          class="i-mdi-chevron-down ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              class="transition duration-200"
              :class="[
                active ? 'bg-primary text-white' : 'bg-white text-black',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <div
                class="i-material-symbols-account-circle mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Profile
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              class="transition duration-200"
              :class="[
                active ? 'bg-primary text-white' : 'bg-white text-black',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
              @click="signOut"
            >
              <div
                class="i-material-symbols-logout mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
