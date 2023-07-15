<template>
  <div class="flex w-full">
    <div class="px-6 py-8 text-white" style="background: #10365c">
      <section class="flex flex-col items-center">
        <img
          v-if="personalDetails.photo && personalDetails.photo.croppedImage"
          :alt="fullName"
          :src="personalDetails.photo.croppedImage"
          class="block mb-2 w-14 h-14 object-cover rounded-full"
        />
        <h1 class="text-2xl text-white font-bold">{{ fullName }}</h1>
        <div class="w-5 bg-gray-300 my-2 h-px"></div>
        <span class="text-sm uppercase">{{ personalDetails.jobTitle }}</span>
      </section>
      <section class="mt-4">
        <h1 class="text-lg">{{ personalDetails.title }}</h1>
        <div class="text-sm">
          <p v-if="personalDetails.city && personalDetails.country">
            {{ personalDetails.city }},
            {{ personalDetails.country }}
          </p>
          <p>
            <a :href="`tel:${personalDetails.phone}`">
              {{ personalDetails.phone }}
            </a>
          </p>
          <p>
            <a :href="`mailto:${personalDetails.email}`" class="underline">
              {{ personalDetails.email }}
            </a>
          </p>

          <h2 class="mt-6 mb-0.5 uppercase font-bold text-xs text-gray-400">
            Nationality
          </h2>
          <p>{{ personalDetails.nationality || "-" }}</p>

          <h2 class="mt-6 mb-0.5 uppercase font-bold text-xs text-gray-400">
            Date / Place of birth
          </h2>
          <p>{{ personalDetails.birthDate || "-" }}</p>
          <p>{{ personalDetails.birthPlace || "-" }}</p>
        </div>
      </section>
    </div>
    <div class="flex-1 bg-white px-6 py-8">
      <section>
        <h1 class="font-bold text-xl mb-1">{{ summary.title }}</h1>
        <div class="text-sm" v-html="summary.content"></div>
      </section>
      <section class="my-6" v-for="section in sections" :key="section.id">
        <h1 class="font-bold text-xl mb-1">{{ section.title }}</h1>
        <component
          v-for="item in section.items"
          :key="item.id"
          :item="item"
          :is="getSectionRendererComponent(item.rendererComponent)"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import EmploymentItem from "@/components/templates/item-renderers/EmploymentItemRenderer";
import EducationItem from "@/components/templates/item-renderers/EducationItemRenderer";
import WebsiteItem from "@/components/templates/item-renderers/WebsiteItemRenderer";
import LanguageItem from "@/components/templates/item-renderers/LanguageItemRenderer";
import SkillItem from "@/components/templates/item-renderers/SkillItemRenderer";

const props = defineProps({
  personalDetails: {
    type: Object,
    required: true,
  },
  summary: {
    type: Object,
    required: true,
  },
  sections: {
    type: Array,
    required: true,
  },
});

const getSectionRendererComponent = (name) => {
  return {
    "employment-item-renderer": EmploymentItem,
    "education-item-renderer": EducationItem,
    "website-item-renderer": WebsiteItem,
    "language-item-renderer": LanguageItem,
    "skill-item-renderer": SkillItem,
  }[name];
};

const fullName = computed(() => {
  const { firstName, lastName } = props.personalDetails;
  return `${firstName} ${lastName}`;
});
</script>
