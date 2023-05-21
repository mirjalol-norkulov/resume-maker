<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useToast } from "vue-toastification";

useHead({
  title: "Sign In",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(false);
const toast = useToast();

watch(user, (value) => {
  if (value) {
    navigateTo("/");
  }
});

const validationSchema = toTypedSchema(
  object({
    email: string()
      .nonempty("Please enter your email address")
      .email({ message: "Must be a valid email address" }),
  })
);

const { handleSubmit, errors, resetForm } = useForm({ validationSchema });
const { value: email } = useField<string>("email");

const onSubmit = handleSubmit(async () => {
  if (loading.value) {
    return;
  }

  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({ email: email.value });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.info("Check your email for the login link!");
    resetForm();
  } finally {
    loading.value = false;
  }
});

const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <NuxtLink to="/"> <LogoTip class="fixed top-4 left-4" /></NuxtLink>
    <div>
      <h1 class="text-3xl font-bold">Sign In</h1>
      <p class="mt-4 text-gray-400">
        Sign in via magic link with your email below
      </p>
      <form class="mt-4" @submit.prevent="onSubmit">
        <RFormItem label="Email" show-error :error-message="errors.email">
          <RInput
            v-model="email"
            type="email"
            full-width
            placeholder="Your email"
            clearable
          />
        </RFormItem>
        <RButton
          :loading="loading"
          type="submit"
          class="mt-4"
          full-width
          color="primary"
        >
          Send magic link
        </RButton>

        <div
          class="my-6 flex items-center before:(content-none block bg-gray-100 h-px flex-1) after:(content-none block bg-gray-100 h-px flex-1)"
        >
          <span class="inline-block px-3 text-xs text-gray-400">OR</span>
        </div>
        <div>
          <button
            type="button"
            class="w-full bg-[#DB4437] text-white flex items-center justify-between rounded px-4 py-2 space-x-2 after:content-none"
            @click="signInWithGoogle"
          >
            <div class="i-mdi-google" />
            <span>Sign In with Google </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
