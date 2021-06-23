<template>
  <div>
    <a :href="item.link" class="underline" target="_blank">{{ item.label }}</a>
  </div>
</template>

<script>
export default {
  name: "WebsiteItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
