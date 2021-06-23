<template>
  <div>
    <default-template
      :personal-details="$store.state.personalDetails"
      :summary="$store.state.summary"
      :sections="$store.state.sections"
    />
  </div>
</template>

<script>
import DefaultTemplate from "@/components/templates/DefaultTemplate";
export default {
  name: "Preview",
  components: { DefaultTemplate },
};
</script>

<style scoped></style>
