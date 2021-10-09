<template>
  <div v-bind="$attrs" v-on="$listeners">
    <div class="transform translate-x-full absolute left-full">
      <default-template
        ref="template"
        :personal-details="personalDetails"
        :summary="summary"
        :sections="sections"
      />
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { mapState } from "vuex";
import DefaultTemplate from "@/components/templates/DefaultTemplate";

export default {
  name: "TemplatePreview",
  components: { DefaultTemplate },
  computed: {
    ...mapState(["personalDetails", "summary", "sections"]),
  },
  mounted() {
    this.convertToCanvas();
    // this.$store.watch(
    //   (state) => {
    //     return {
    //       personalDetails: state.personalDetails,
    //       summary: state.summary,
    //       sections: state.sections,
    //     };
    //   },
    //   () => {
    //     this.convertToCanvas();
    //   },
    //   { deep: true }
    // );
  },
  methods: {
    convertToCanvas() {
      html2canvas(this.$refs.template.$el).then((canvas) => {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "absolute";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.objectFit = "cover";
        canvas.style.objectPosition = "0 0";
        this.$el.append(canvas);
      });
    },
  },
};
</script>
