<template>
  <div class="rich-text-editor">
    <editor-menu v-if="editor" :editor="editor" />
    <editor-content class="rich-text-editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import EditorMenu from "@/components/editor/EditorMenu";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

export default {
  name: "RichTextEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Write something...",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EditorMenu,
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({
          emptyEditorClass: "is-editor-empty",
          emptyNodeClass: "is-empty",
          placeholder: this.placeholder,
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
        Link,
      ],
      content: this.value,
      onUpdate: () => {
        // HTML
        this.$emit("input", this.editor.getHTML());

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.rich-text-editor {
  @apply bg-blue-gray-100 relative px-4 py-2;

  &::after {
    content: "";
    @apply absolute left-0 bottom-0 block w-full h-0.5 bg-primary
    transform scale-x-0 opacity-0
    transition-opacity transition-transform duration-300;
  }

  &:focus-within::after {
    @apply scale-x-100 opacity-100;
  }

  &__content {
    .ProseMirror {
      @apply outline-none;
      min-height: 6rem;

      ul {
        list-style-type: disc;
        @apply pl-8;
      }

      ol {
        @apply list-decimal pl-8;
      }

      p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #ced4da;
        pointer-events: none;
        height: 0;
      }
    }
  }
}
</style>
