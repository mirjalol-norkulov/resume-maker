<template>
  <div class="rounded bg-gray-200 inline-block py-2 px-2 m-1">
    {{ item.skill }}
  </div>
</template>

<script>
export default {
  name: "SkillItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
