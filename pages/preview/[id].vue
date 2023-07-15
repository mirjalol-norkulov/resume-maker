<script setup lang="ts">
const route = useRoute();
const { data: resume } = await useFetch(`/api/resumes/${route.params.id}`);

useHead({ title: resume.value?.name });
</script>

<template>
  <div class="flex min-h-screen items-stretch justify-center">
    <DefaultTemplate
      :personal-details="resume?.personal_details || {}"
      :summary="resume?.summary || {}"
      :sections="resume?.sections || []"
    />
  </div>
</template>
