<template>
  <nav class="py-2 flex items-center space-x-2">
    <button
      class="outline-none w-5 h-5"
      :class="{ 'text-primary': editor.isActive('bold') }"
      @click="editor.chain().toggleBold().focus().run()"
    >
      <div class="i-material-symbols-format-bold" />
    </button>
    <button
      class="outline-none w-5 h-5"
      :class="{ 'text-primary': editor.isActive('italic') }"
      @click="editor.chain().toggleItalic().focus().run()"
    >
      <div class="i-material-symbols-format-italic" />
    </button>
    <button
      class="outline-none w-5 h-5"
      :class="{ 'text-primary': editor.isActive('underline') }"
      @click="editor.commands.toggleUnderline"
    >
      <div class="i-material-symbols-format-underlined" />
    </button>
    <button
      class="outline-none w-5 h-5"
      :class="{ 'text-primary': editor.isActive('strike') }"
      @click="editor.chain().toggleStrike"
    >
      <div class="i-material-symbols-format-strikethrough" />
    </button>
    <div class="editor-menu__divider"></div>
    <button
      class="outline-none w-5 h-5"
      :class="{ 'text-primary': editor.isActive('orderedList') }"
      @click="editor.commands.toggleOrderedList"
    >
      <div class="i-material-symbols-format-list-numbered" />
    </button>
    <button
      class="outline-none w-5 h-5"
      :class="{ 'editor-menu__btn--active': editor.isActive('bulletList') }"
      @click="editor.commands.toggleBulletList"
    >
      <div class="i-material-symbols-format-list-bulleted" />
    </button>

    <div class="block h-5 w-0.25 bg-gray-300 self-stretch"></div>

    <button
      class="outline-none w-5 h-5"
      :class="{ 'editor-menu__btn--active': editor.isActive('link') }"
      @click="handleLinkClick"
    >
      <div class="i-material-symbols-link" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";

const props = defineProps<{
  editor: Editor;
}>();
const handleLinkClick = () => {
  const previousUrl = props.editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    props.editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  props.editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};
</script>

<style>
.editor-menu {
  &__divider {
    width: 1px;
    @apply block h-5 bg-gray-300 self-stretch mx-1;
  }
}
</style>
