// uno.config.ts
import {
  defineConfig,
  presetWebFonts,
  transformerVariantGroup,
  transformerDirectives,
  presetUno,
} from "unocss";
import { presetAnimations } from "unocss-preset-animations";

import { theme } from "@unocss/preset-mini";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Nunito Sans:400,500,600,700,800",
      },
    }),
    presetAnimations(),
  ],
  theme: {
    colors: {
      black: {
        DEFAULT: "#333333",
      },
      primary: {
        DEFAULT: theme.colors.sky["500"],
        darker: theme.colors.sky["700"],
        light: theme.colors.sky["50"],
      },
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
