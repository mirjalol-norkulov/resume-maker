<template>
  <div
    class="rich-text-editor bg-slate-100 relative px-4 py-2 after:(content-none absolute left-0 bottom-0 block w-full h-0.5 bg-primary transform scale-x-0 opacity-0 transition-opacity transition-transform duration-300) focus-within:after:(scale-x-100 opacity-100)"
  >
    <editor-menu v-if="editor" :editor="editor" />
    <editor-content
      class="[&_.ProseMirror]:(outline-none min-h-[6rem])"
      :editor="editor"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    fullWidth?: boolean;
  }>(),
  {
    modelValue: "",
    fullWidth: false,
  }
);

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value;
    if (isSame) {
      return;
    }

    editor.value?.commands.setContent(value, false);
  }
);

const emit = defineEmits(["update:model-value"]);
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  onUpdate: () => {
    emit("update:model-value", editor.value?.getHTML());
  },
});
</script>

<style>
.ProseMirror ul {
  @apply list-disc pl-8;
}

.ProseMirror ol {
  @apply list-decimal pl-8;
}

.ProseMirror a {
  @apply text-primary cursor-pointer;
}

.ProseMirror a:hover {
  @apply underline;
}

.ProseMirror > * + * {
  @apply mt-3;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
