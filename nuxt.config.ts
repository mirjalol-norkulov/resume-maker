// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@nuxt/icon",
  ],

  supabase: {
    redirectOptions: {
      login: "/auth/sign-in",
      callback: "/auth/confirm",
      include: undefined,
      exclude: ["/", "/auth/sign-in"],
      cookieRedirect: true,
    },
  },
  icon: {
    customCollections: [{ prefix: "local", dir: "./icons" }],
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: true,
  },

  compatibilityDate: "2024-07-18",
});
