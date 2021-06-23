<template>
  <div class="r-input" :class="{ 'flex w-full': fullWidth }" v-bind="$attrs">
    <input
      class="r-input__input"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      v-bind="inputProps"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  name: "RInput",
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    inputProps: {
      type: Object,
      default: () => ({}),
    },
    inputEvents: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    listeners() {
      return Object.entries(this.$listeners)
        .filter(([key]) => key !== "input")
        .reduce((res, [key, value]) => ({ ...res, [key]: value }), {});
    },
  },
};
</script>

<style lang="scss">
.r-input {
  @apply bg-blue-gray-100 rounded inline-flex relative;

  &::after {
    content: "";
    @apply absolute left-0 bottom-0 block w-full h-0.5 bg-primary
    transform scale-x-0 opacity-0
    transition-opacity transition-transform duration-300;
  }

  &__input {
    @apply bg-transparent
    inline-block
    w-full
    outline-none
    px-4
    py-2
    text-black;
  }

  &:focus-within::after {
    @apply scale-x-100 opacity-100;
  }
}
</style>
