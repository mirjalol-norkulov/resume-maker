import Toast, { PluginOptions } from "vue-toastification";

export default defineNuxtPlugin(({ vueApp }) => {
  const options: PluginOptions = {
    hideProgressBar: true,
  };
  vueApp.use(Toast, options);
});
