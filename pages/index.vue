<script setup lang="ts">
// const { error, data } = await supabase
//   .from("resumes")
//   .insert({
//     name: "Test",
//     personal_details: {},
//     summary: {},
//     sections: [],
//     status: "Draft",
//   } as any)
//   .select("id")
//   .single();

// if (error) {
//   toast.error(error.message);
// } else {
//   navigateTo(`/app/resumes/${data?.id}`);
// }
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Welcome!</h1>
  </div>
</template>
