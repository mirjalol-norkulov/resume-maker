<script setup lang="ts">
import draggable from "vuedraggable";
import {
  SectionsEducation,
  SectionsEmploymentHistory,
  SectionsLanguagesSection,
  SectionsSkillsSection,
  SectionsWebsitesWebsiteLinks,
} from "#components";

const personalDetails = reactive({
  title: "Personal details",
  photo: null,
  jobTitle: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  nationality: "",
  birthPlace: "",
  birthDate: "",
});
const showAdditionalDetails = ref(false);
const summary = reactive({
  title: "Professional summary",
  content: "",
});

const drag = ref(false);

const sections = shallowRef([
  {
    id: 1,
    title: "Employment history",
    hint: "Include your last 10 years of relevant experience and dates in this section. List your most recent position first",
    component: SectionsEmploymentHistory,
    items: [],
  },
  {
    id: 2,
    title: "Education",
    hint: "If relevant, include your most recent educational achievements and the dates here",
    component: SectionsEducation,
    items: [],
  },
  {
    id: 3,
    title: "Websites & Social Links",
    hint: "You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website",
    component: SectionsWebsitesWebsiteLinks,
    items: [],
  },
  {
    id: 5,
    title: "Languages",
    hint: "",
    component: SectionsLanguagesSection,
    items: [],
  },
  {
    id: 6,
    title: "Skills",
    hint: "",
    component: SectionsSkillsSection,
    items: [],
  },
]);

const handleSectionUpdate = (section: any) => {
  sections.value = sections.value.map((s: any) =>
    s.id === section.id ? section : s
  );
};
</script>

<template>
  <div class="flex w-screen min-h-screen">
    <section class="w-1/2 px-12 pb-20 max-h-screen overflow-y-auto scrollable">
      <div class="flex justify-center py-5">
        <LogoTip />
      </div>
      <EditableTitle class="mb-2" v-model="personalDetails.title" />
      <div class="grid grid-cols-2 gap-8 items-end">
        <r-form-item label="Wanted job title" full-width>
          <r-input
            full-width
            placeholder="e.g Frontend developer"
            v-model="personalDetails.jobTitle"
          />
        </r-form-item>
        <r-form-item full-width>
          <photo-uploader v-model="personalDetails.photo" />
        </r-form-item>
        <r-form-item label="First Name" full-width>
          <r-input full-width v-model="personalDetails.firstName" />
        </r-form-item>
        <r-form-item label="Last Name" full-width>
          <r-input full-width v-model="personalDetails.lastName" />
        </r-form-item>
        <r-form-item label="Email" full-width>
          <r-input full-width type="email" v-model="personalDetails.email" />
        </r-form-item>
        <r-form-item label="Phone" full-width>
          <r-input full-width v-model="personalDetails.phone" />
        </r-form-item>
      </div>
      <r-collapse
        :collapsed="!showAdditionalDetails"
        class="mt-8 grid grid-cols-2 gap-8 items-end"
      >
        <r-form-item label="Country" full-width>
          <r-input full-width v-model="personalDetails.country" />
        </r-form-item>
        <r-form-item label="City" full-width>
          <r-input full-width v-model="personalDetails.city" />
        </r-form-item>
        <r-form-item label="Address" full-width>
          <r-input full-width v-model="personalDetails.address" />
        </r-form-item>
        <r-form-item label="Nationality" full-width>
          <r-input full-width v-model="personalDetails.nationality" />
        </r-form-item>
        <r-form-item label="Place of birth" full-width>
          <r-input full-width v-model="personalDetails.birthPlace" />
        </r-form-item>
        <r-form-item label="Date of birth" full-width>
          <r-input full-width type="date" v-model="personalDetails.birthDate" />
        </r-form-item>
      </r-collapse>
      <button
        class="my-4 outline-none focus:outline-none text-primary font-bold hover:text-primary-darker"
        @click="showAdditionalDetails = !showAdditionalDetails"
      >
        <span v-if="!showAdditionalDetails" class="flex items-center">
          Edit additional details
          <div class="i-mdi-chevron-down w-5 h-5" />
        </span>
        <span v-else class="flex items-center">
          Hide additional details
          <div class="i-mdi-chevron-up w-5 h-5" />
        </span>
      </button>
      <editable-title class="mb-2" v-model="summary.title" />
      <r-form-item
        label="Include 2-3 clear sentences about your overall experience"
      >
        <EditorRichTextEditor
          placeholder="Write something about yourself..."
          v-model="summary.content"
        />
      </r-form-item>

      <draggable
        v-model="sections"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element: section }">
          <component
            class="my-8"
            :section="section"
            @update:section="handleSectionUpdate"
            drag-handle-class="section-drag-handle"
            :is="section.component"
          />
        </template>
      </draggable>
    </section>
  </div>
</template>
