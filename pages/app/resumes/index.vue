<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({ layout: "app-layout" });

useHead({
  title: "My resumes",
});
const supabase = useSupabaseClient();
const { data: resumes } = await supabase
  .from("resumes")
  .select("id,name,updated_at");
</script>

<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <header class="flex items-center justify-between">
        <h1 class="text-3xl md:text-4xl font-bold">Resumes</h1>
        <RButton color="primary" size="sm">
          <span class="i-ri-add-line w-4 h-4"></span>
          Create new
        </RButton>
      </header>
      <div v-if="resumes" class="mt-8 grid grid-cols-2">
        <div v-for="resume in resumes" :key="resume.id" class="flex gap-6">
          <NuxtLink
            :to="`/app/resumes/${resume.id}`"
            class="w-48 aspect-[3/4] rounded border border-solid border-gray-200 flex items-center justify-center"
          >
            <div class="i-ri-file-4-line text-gray-400 w-12 h-12" />
          </NuxtLink>
          <section>
            <h2 class="text-xl font-medium">{{ resume.name }}</h2>
            <p class="text-xs text-gray-500">
              Updated {{ dayjs(resume.updated_at).format("DD.MM.YYYY HH:mm") }}
            </p>
            <div class="mt-4 space-y-2">
              <NuxtLink
                :to="`/app/resumes/${resume.id}`"
                class="flex items-center space-x-2 hover:text-primary"
              >
                <span
                  class="inline-block i-ri-pencil-line w-5 h-5 text-primary"
                />
                <span>Edit</span>
              </NuxtLink>
              <button
                class="bg-transparent flex items-center space-x-2 hover:text-primary"
              >
                <span
                  class="inline-block i-ri-download-line w-5 h-5 text-primary"
                />
                <span>Download PDF</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
