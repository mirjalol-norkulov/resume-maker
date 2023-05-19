// uno.config.ts
import {
  defineConfig,
  presetWebFonts,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives,
  presetUno,
} from "unocss";
import { theme } from "@unocss/preset-mini";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Nunito Sans:400,500,600,700,800",
      },
    }),
    presetIcons({
      collections: {
        local: FileSystemIconLoader("./icons", (svg) =>
          svg.replace(/#fff/, "currentColor")
        ),
      },
    }),
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
