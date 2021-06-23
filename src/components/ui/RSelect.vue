<template>
  <div class="r-select">
    <div
      class="r-select__current"
      tabindex="0"
      @blur="closeMenu"
      @keyup.esc="closeMenu"
      @click="toggleIsOpen"
    >
      {{ currentSelectedItem && currentSelectedItem[itemLabel] }}
      <chevron-down
        class="r-select__icon"
        :class="{ 'r-select__icon--rotated': isOpen }"
      />
    </div>
    <transition name="select-menu">
      <div v-if="isOpen" class="r-select__menu">
        <r-select-option
          v-for="item in items"
          :key="item[itemKey]"
          :value="item[itemKey]"
          :label="item[itemLabel]"
          @click="handleOptionClick(item[itemKey])"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import ChevronDown from "@/assets/svg/chevron-down.svg";
import RSelectOption from "@/components/ui/RSelectOption";

export default {
  name: "RSelect",
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    items: {
      type: [Array],
      default: () => [],
    },
    itemKey: {
      type: String,
      default: undefined,
    },
    itemLabel: {
      type: String,
      default: undefined,
    },
  },
  components: {
    RSelectOption,
    ChevronDown,
  },
  data() {
    return {
      innerValue: undefined,
      isOpen: false,
    };
  },
  computed: {
    currentSelectedItem() {
      return this.items.find((item) => item[this.itemKey] === this.value);
    },
    attributes() {
      const result = {};
      Object.entries(this.$attrs).forEach(([attr, value]) => {
        if (attr !== "value") {
          result[attr] = value;
        }
      });

      return result;
    },
    listeners() {
      return Object.entries(this.$listeners)
        .filter(([attr]) => attr !== "input")
        .reduce(
          (res, [attr, value]) => ({
            ...res,
            [attr]: value,
          }),
          {}
        );
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.innerValue = value;
      },
    },
    innerValue: {
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
    handleOptionClick(value) {
      this.innerValue = value;
      this.closeMenu();
    },
    handleOutsideClick() {},
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.r-select {
  @apply relative;

  &__current {
    @apply outline-none bg-blue-gray-100 inline-block
      w-full outline-none
      px-4 py-2
      text-black cursor-pointer text-sm select-none;

    min-width: 120px;
    min-height: 40px;

    &::after {
      content: "";
      @apply absolute left-0 bottom-0 block w-full h-0.5 bg-primary
      transform scale-x-0 opacity-0
      transition-opacity transition-transform duration-300;
    }

    &:focus-within::after {
      @apply scale-x-100 opacity-100;
    }
  }

  &__icon {
    @apply absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-200;
    transform-origin: top;

    &--rotated {
      transform: rotate(180deg) translateY(-50%);
    }
  }

  &__menu {
    @apply absolute left-0 bg-white border border-solid border-gray-300 w-full rounded-lg z-50;
    top: calc(100% + 0.5rem);
  }
}

.select-menu {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-200;
  }

  &-enter {
    @apply transform -translate-y-4 opacity-0;
  }

  &-enter-to {
    @apply transform translate-y-0 opacity-100;
  }

  &-leave {
    @apply transform translate-y-0 opacity-100;
  }

  &-leave-to {
    @apply transform -translate-y-4 opacity-0;
  }
}
</style>
