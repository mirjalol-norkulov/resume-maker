<script setup lang="ts">
import draggable from "vuedraggable";
import {
  Education,
  EmploymentHistory,
  LanguagesSection,
  SkillsSection,
  WebsiteLinks,
} from "#components";
import { SectionType } from "~/types/enums";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const supabase = useSupabaseClient();

const resume = ref(
  (
    await supabase
      .from("resumes")
      .select("*")
      .eq("id", route.params.id)
      .single<any>()
  ).data
);

// const { data: resume } = await supabase
// .from("resumes")
// .select("*")
// .eq("id", route.params.id)
// .single<any>();

useHead({
  title: resume.value.name,
});

const name = ref(resume.value.name);
const photo = shallowRef();

const personalDetails = reactive(
  resume.value.personal_details || {
    title: "Personal details",
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
  }
);

const showAdditionalDetails = ref(false);
const summary = reactive(
  resume.value.summary || {
    title: "Professional summary",
    content: "",
  }
);

const drag = ref(false);

interface Section {
  id: string | number;
  title: string;
  type: SectionType;
  items: any[];
}

const sections = ref(
  resume.value.sections || [
    {
      id: 1,
      title: "Employment history",
      type: SectionType.EmploymentHistory,
      items: [],
    },
    {
      id: 2,
      title: "Education",
      type: SectionType.Education,
      items: [],
    },
    {
      id: 3,
      title: "Websites & Social Links",
      type: SectionType.Websites,
      items: [],
    },
    {
      id: 5,
      title: "Languages",
      type: SectionType.Languages,
      items: [],
    },
    {
      id: 6,
      title: "Skills",
      type: SectionType.Skills,
      items: [],
    },
  ]
);

function dataURItoBlob(dataURI: string) {
  return fetch(dataURI).then((response) => response.blob());
}

watch(photo, async () => {
  if (photo.value && photo.value.croppedImage) {
    const blob = await dataURItoBlob(photo.value.originalImage);
    const { data } = await supabase.storage
      .from("resume_photos")
      .upload("avatar.jpg", blob, {
        cacheControl: "3600",
        upsert: false,
      });
    const filepath = data?.path;

    if (filepath) {
      await supabase
        .from("resumes")
        .update({ photo: filepath } as never)
        .eq("id", resume.value.id);
    }
  }
});

const SECTION_COMPONENT_MAP: Record<SectionType, any> = {
  [SectionType.EmploymentHistory]: EmploymentHistory,
  [SectionType.Education]: Education,
  [SectionType.Websites]: WebsiteLinks,
  [SectionType.Languages]: LanguagesSection,
  [SectionType.Skills]: SkillsSection,
};

const handleSectionUpdate = (section: any) => {
  sections.value = sections.value.map((s: any) =>
    s.id === section.id ? section : s
  );
};

const { refresh: updateResumePreview } = useFetch(
  `/api/preview/${resume.value.id}`,
  {
    method: "POST",
    server: false,
    onResponse(context) {
      resume.value = context.response._data;
    },
  }
);

watchDebounced(
  [name, personalDetails, summary, sections],
  async () => {
    await supabase
      .from("resumes")
      .update({
        name: name.value,
        personal_details: personalDetails,
        summary,
        sections: sections.value,
      } as never)
      .eq("id", resume.value.id);
    updateResumePreview();
  },
  { debounce: 500, deep: true }
);

const pdfUrl = computed(() => {
  if (resume.value.pdf_url) {
    const { data } = supabase.storage
      .from("resume_pdf_files")
      .getPublicUrl(resume.value.pdf_url);

    const url = new URL(data.publicUrl);
    url.searchParams.set("key", new Date().valueOf().toString());
    return url.toString();
  }

  return null;
});
</script>

<template>
  <div class="flex w-screen min-h-screen">
    <section class="w-1/2 px-12 pb-20 max-h-screen overflow-y-auto scrollable">
      <div class="flex justify-center py-5">
        <EditableTitle v-model="name" />
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
          <photo-uploader v-model="photo" />
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
        class="my-4 bg-transparent outline-none focus:outline-none text-primary font-bold hover:text-primary-darker"
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
        <RichTextEditor
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
            :is="SECTION_COMPONENT_MAP[(section as Section).type] as string"
          />
        </template>
      </draggable>
    </section>
    <section
      class="w-1/2 min-h-screen bg-gray-500 flex items-center justify-center"
    >
      <ClientOnly>
        <PdfView v-if="pdfUrl" :src="pdfUrl" />
      </ClientOnly>
    </section>
  </div>
</template>
