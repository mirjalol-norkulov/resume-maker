<template>
  <div>
    <h1 class="font-bold">
      {{ item.jobTitle }}, {{ item.employer }}, {{ item.city }}
    </h1>
    <p class="my-2 text-xs uppercase font-bold text-gray-400">
      {{ item.interval.start }} - {{ item.interval.end }}
    </p>
    <div class="mt-2 text-sm" v-html="item.description"></div>
  </div>
</template>

<script>
export default {
  name: "EmploymentItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
