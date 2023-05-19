<template>
  <Listbox v-slot="{ open }">
    <div class="relative">
      <ListboxButton
        class="outline-none !bg-slate-100 min-w-[120px] min-h-[40px] inline-flex items-center justify-between w-full outline-none px-4 py-2 text-black cursor-pointer text-sm select-none"
      >
        {{ currentSelectedItem?.[itemLabel] || "Select option" }}
        <div
          class="i-mdi-chevron-down transform transition duration-200"
          :class="{ 'rotate-180': open }"
        />
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute left-0 bg-white border border-solid border-gray-300 w-full rounded-lg z-50 top-[calc(100%_+_0.5rem)]"
        >
          <ListboxOption
            v-for="item in items"
            :key="item[itemKey]"
            :value="item[itemKey]"
            class="px-4 py-2 text-sm cursor-pointer transition-all duration-200 select-none hover:bg-gray-300"
          >
            {{ item[itemLabel] }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const props = withDefaults(
  defineProps<{
    items?: any[];
    itemKey?: string;
    itemLabel?: string;
  }>(),
  {
    itemKey: "",
    itemLabel: "",
  }
);

const attrs = useAttrs();

const currentSelectedItem = computed<any>(() =>
  props.items?.find((item: any) => item[props.itemKey] === attrs.modelValue)
);
</script>
