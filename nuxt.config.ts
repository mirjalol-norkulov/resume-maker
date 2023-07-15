import { FileSystemIconLoader } from "unplugin-icons/loaders";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxtjs/supabase", "@vueuse/nuxt"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: true,
  },
  build: {
    // transpile: ["@tato30/vue-pdf", "pdfjs-dist"],
  },
});
