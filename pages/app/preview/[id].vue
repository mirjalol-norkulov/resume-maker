<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient();
const { data: resume } = await supabase
  .from("resumes")
  .select("*")
  .eq("id", route.params.id)
  .single<any>();

useHead({ title: resume.name });
</script>

<template>
  <div class="flex min-h-screen items-stretch justify-center bg-slate-100 p-8">
    <TemplatesDefaultTemplate
      :personal-details="resume?.personal_details || {}"
      :summary="resume?.summary || {}"
      :sections="resume?.sections || []"
    />
  </div>
</template>
