<template>
  <div ref="menuRef" class="dropdown__wrapper">
    <Button @click="handleToggleOpen">
      <slot></slot>
    </Button>
    <div v-if="isOpen" role="menu" :class="['dropdown__menu', className]">
      <button
        v-for="(option, index) in options"
        :key="`${option.label}__${option.value}__${index}`"
        @click="option.onClick"
        :disabled="option.disabled"
      >
        <template v-if="hasCheckbox">
          <CheckboxChecked v-if="option.checked" />
          <Checkbox v-else />
        </template>
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Button from "./Button";
import { Checkbox, CheckboxChecked } from "./Icons";
import { useOutsideClick } from "~/hooks/useOutsideClick";

interface Option {
  label: string;
  value: string;
  onClick: () => void;
  disabled?: boolean;
  checked?: boolean;
}

defineProps({
  options: {
    type: Array as () => Option[],
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  hasCheckbox: {
    type: Boolean,
    default: false,
  },
});

const menuRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const handleToggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// Handling outside click using the custom hook
useOutsideClick(
  menuRef,
  () => {
    isOpen.value = false;
  },
  isOpen
);
</script>

<style scoped lang="scss">
.dropdown {
  &__wrapper {
    position: relative;
  }

  &__menu {
    position: absolute;
    right: 2px;
    top: 100%;
    background-color: var(--border-style);
    color: var(--primary-text-color);

    border: var(--border-style);
    display: grid;
    max-height: 330px;
    z-index: 2;
    overflow: auto;

    & > * {
      all: unset;
      padding: var(--spacer-xs) var(--spacer-sm);
      white-space: nowrap;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--spacer-sm);

      &:hover {
        background-color: rgba(128, 128, 128, 0.2) !important;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
