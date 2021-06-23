<template>
  <nav class="editor-menu">
    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('bold') }"
      @click="editor.chain().toggleBold().focus().run()"
    >
      <format-bold />
    </button>
    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('italic') }"
      @click="editor.chain().toggleItalic().focus().run()"
    >
      <format-italic />
    </button>
    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('underline') }"
      @click="editor.chain().toggleUnderline().focus().run()"
    >
      <format-underlined />
    </button>
    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('strike') }"
      @click="editor.chain().toggleStrike().focus().run()"
    >
      <strike-through />
    </button>
    <div class="editor-menu__divider"></div>
    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('orderedList') }"
      @click="editor.chain().toggleOrderedList().focus().run()"
    >
      <list-numbered />
    </button>
    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <list-bulleted />
    </button>

    <div class="editor-menu__divider"></div>

    <button
      class="editor-menu__btn"
      :class="{ 'editor-menu__btn--active': editor.isActive('link') }"
      @click="handleLinkClick"
    >
      <format-link />
    </button>
  </nav>
</template>

<script>
import FormatBold from "@/assets/svg/format_bold.svg";
import FormatItalic from "@/assets/svg/format_italic.svg";
import FormatUnderlined from "@/assets/svg/format_underlined.svg";
import StrikeThrough from "@/assets/svg/strikethrough.svg";
import ListBulleted from "@/assets/svg/format_list_bulleted.svg";
import ListNumbered from "@/assets/svg/format_list_numbered.svg";
import FormatLink from "@/assets/svg/link.svg";

export default {
  name: "EditorMenu",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  components: {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    StrikeThrough,
    ListBulleted,
    ListNumbered,
    FormatLink,
  },
  methods: {
    handleLinkClick() {
      if (this.editor.isActive("link")) {
        this.editor.chain().focus().unsetLink().run();
      } else {
        this.setLink();
      }
    },
    setLink() {
      const url = window.prompt("URL");

      this.editor.chain().focus().setLink({ href: url }).run();
    },
  },
};
</script>

<style lang="scss">
.editor-menu {
  @apply py-2 flex items-center;

  &__btn {
    @apply outline-none w-5 h-5 mx-2;
    &:focus {
      @apply outline-none;
    }

    &--active {
      @apply text-primary;
    }
  }

  &__divider {
    width: 1px;
    @apply block h-5 bg-gray-300 self-stretch mx-1;
  }
}
</style>
