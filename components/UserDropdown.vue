<script setup lang="ts">
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "radix-vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const isOpen = ref(false);

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
  <DropdownMenuRoot v-model:open="isOpen">
    <DropdownMenuTrigger
      class="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm bg-white space-x-2"
    >
      <img :src="avatar" class="w-7 h-7 rounded-full" :alt="name" />
      <span>{{ name }}</span>
      <Icon
        name="i-mdi-chevron-down"
        class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
        aria-hidden="true"
      />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none will-change-[opacity,transform] animate-in data-[side=top]:slide-in-top--4 data-[side=bottom]:slide-in-top--4"
      >
        <DropdownMenuLabel />
        <DropdownMenuItem
          class="transition duration-200 group flex w-full items-center rounded-md px-2 py-2 text-sm bg-white text-black hover:bg-primary hover:text-white"
        >
          <Icon
            name="i-material-symbols-account-circle"
            class="mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          class="transition duration-200 group flex w-full items-center rounded-md px-2 py-2 text-sm bg-white text-black data-[highlighted]:bg-primary data-[highlighted]:text-white"
          @click="signOut"
        >
          <Icon
            name="i-material-symbols-logout"
            class="mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Sign out
        </DropdownMenuItem>

        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
