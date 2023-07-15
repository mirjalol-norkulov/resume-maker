import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  const resumeId = event.context.params?.id;
  const { data: resume } = await client
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single<any>();

  return resume;
});
