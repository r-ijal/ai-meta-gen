// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    OPENAI_API_KEY: "",
    OPENROUTER_API_KEY: "",
    SUPABASE_URL:"",
    SUPABASE_KEY:""
  },
});
