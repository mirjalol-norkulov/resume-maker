<template>
  <div
    class="transition-all duration-300"
    :class="{ 'overflow-y-hidden': collapsed }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "RCollapse",
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    collapsed: {
      handler(value) {
        if (!this.$el) {
          return;
        }
        if (value) {
          this.collapse();
        } else {
          this.expand();
        }
      },
    },
  },
  mounted() {
    if (this.collapsed) {
      this.$el.style.height = 0;
    }
  },
  methods: {
    expand() {
      const element = this.$el;
      const sectionHeight = element.scrollHeight;

      // have the element transition to the height of its inner content
      element.style.height = `${sectionHeight}px`;

      // when the next css transition finishes (which should be the one we just triggered)
      element.addEventListener(
        "transitionend",
        () => {
          // remove "height" from the element's inline styles, so it can return to its initial value
          element.style.height = null;
        },
        { once: true }
      );
    },
    collapse() {
      const element = this.$el;
      // get the height of the element's inner content, regardless of its actual size
      const sectionHeight = element.scrollHeight;

      // temporarily disable all css transitions
      const elementTransition = element.style.transition;
      element.style.transition = "";

      // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      requestAnimationFrame(() => {
        element.style.height = `${sectionHeight}px`;
        element.style.transition = elementTransition;

        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        requestAnimationFrame(() => {
          element.style.height = "0px";
        });
      });
    },
  },
};
</script>
