<template>
  <div class="flex w-screen min-h-screen">
    <section class="w-1/2 px-12 py-20 max-h-screen overflow-y-auto scrollable">
      <editable-title class="mb-2" v-model="personalDetails.title" />
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
        class="
          my-4
          outline-none
          focus:outline-none
          text-primary
          font-bold
          hover:text-primary-darker
        "
        @click="showAdditionalDetails = !showAdditionalDetails"
      >
        <span v-if="!showAdditionalDetails" class="flex items-center">
          Edit additional details
          <chevron-down-icon class="w-5 h-5" />
        </span>
        <span v-else class="flex items-center">
          Hide additional details
          <chevron-up-icon class="w-5 h-5" />
        </span>
      </button>
      <editable-title class="mb-2" v-model="summary.title" />
      <r-form-item
        label="Include 2-3 clear sentences about your overall experience"
      >
        <rich-text-editor
          placeholder="Write something about yourself..."
          v-model="summary.content"
        />
      </r-form-item>

      <draggable
        v-model="sections"
        handle=".section-drag-handle"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <component
            class="my-8"
            v-for="section in sections"
            :section="section"
            @update:section="handleSectionUpdate"
            drag-handle-class="section-drag-handle"
            :key="section.id"
            :is="section.component"
          />
        </transition-group>
      </draggable>
    </section>
    <section
      class="
        w-1/2
        bg-gray-400
        max-h-screen
        flex
        items-center
        justify-center
        relative
      "
    >
      <div class="bg-white rounded-lg w-11/12 transform scale-75">
        <default-template
          class="shadow-lg"
          ref="template"
          :personal-details="personalDetails"
          :summary="summary"
          :sections="sections"
        />
      </div>
      <r-button
        class="absolute bottom-4 right-4"
        color="primary"
        @click="handleExportPDF"
      >
        Export PDF
      </r-button>
    </section>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import RInput from "@/components/ui/RInput";
import RFormItem from "@/components/ui/RFormItem";
import RCollapse from "@/components/ui/RCollapse";
import ChevronUpIcon from "@/assets/svg/chevron-up.svg";
import ChevronDownIcon from "@/assets/svg/chevron-down.svg";
import RichTextEditor from "@/components/editor/RichTextEditor";
import EditableTitle from "@/components/EditableTitle";
import DynamicSection from "@/components/DynamicSection";
import EmploymentHistory from "@/components/sections/employment/EmploymentHistory";
import Education from "@/components/sections/education/Education";
import WebsiteLinks from "@/components/sections/websites/WebsiteLinks";
import LanguagesSection from "@/components/sections/languages/LanguagesSection";
import SkillsSection from "@/components/sections/skills/SkillsSection";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import DynamicItem from "@/components/DynamicItem";
import RButton from "@/components/ui/RButton";
import PhotoUploader from "@/components/PhotoUploader";

export default {
  name: "Home",
  components: {
    PhotoUploader,
    RButton,
    DynamicItem,
    DynamicSection,
    EditableTitle,
    RichTextEditor,
    RCollapse,
    RFormItem,
    RInput,
    ChevronUpIcon,
    ChevronDownIcon,
    EmploymentHistory,
    Education,
    WebsiteLinks,
    LanguagesSection,
    SkillsSection,
    draggable,
    DefaultTemplate,
  },
  data() {
    return {
      drag: false,
      showAdditionalDetails: false,
    };
  },
  computed: {
    personalDetails: {
      get() {
        return this.$store.state.personalDetails;
      },
      set(value) {
        this.$store.commit("SET_PERSONAL_DETAILS", value);
      },
    },
    summary: {
      get() {
        return this.$store.state.summary;
      },
      set(value) {
        this.$store.commit("SET_SUMMARY", value);
      },
    },
    sections: {
      get() {
        return this.$store.state.sections;
      },
      set(value) {
        this.$store.commit("SET_SECTIONS", value);
      },
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
      };
    },
  },
  watch: {
    personalDetails: {
      deep: true,
      handler(newValue) {
        this.setPersonalDetails(newValue);
      },
    },
    summary: {
      deep: true,
      handler(newValue) {
        this.setSummary(newValue);
      },
    },
    sections: {
      deep: true,
      handler(newValue) {
        this.setSections(newValue);
      },
    },
  },
  methods: {
    ...mapMutations({
      setPersonalDetails: "SET_PERSONAL_DETAILS",
      setSummary: "SET_SUMMARY",
      setSections: "SET_SECTIONS",
    }),
    handleSectionUpdate(section) {
      this.sections = this.sections.map((s) =>
        s.id === section.id ? section : s
      );
    },
    async handleExportPDF() {
      const templateHTML = this.$refs.template.$el.innerHTML;
      try {
        const response = await this.$api.post(
          "/export-pdf",
          {
            html: templateHTML,
          },
          { responseType: "blob" }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "CV.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 1;
}
</style>
