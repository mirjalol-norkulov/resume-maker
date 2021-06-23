<template>
  <div>
    <h1 class="font-bold">
      {{ item.degree }}, {{ item.school }}, {{ item.city }}
    </h1>
    <p class="my-2 text-xs uppercase font-bold text-gray-400">
      {{ item.interval.start }} - {{ item.interval.end }}
    </p>
    <div v-html="item.description"></div>
  </div>
</template>

<script>
export default {
  name: "EducationItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
