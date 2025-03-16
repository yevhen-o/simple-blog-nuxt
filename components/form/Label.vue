<template>
  <label :class="labelClasses" :for="forId">
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  isInField: {
    type: Boolean,
    default: false,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
  isFilled: {
    type: Boolean,
    default: false,
  },
  forId: {
    type: String,
    required: false,
  },
});

const labelClasses = computed(() => [
  "custom-label",
  {
    "custom-label--in-field": props.isInField,
    "custom-label--focused": props.isFocused,
    "custom-label--filled": props.isFilled,
  },
]);
</script>

<style lang="scss" scoped>
.custom-label {
  color: var(--color--text-03);

  &--in-field {
    padding: 0.75rem 1rem 0.125rem 1rem;
    background-color: transparent;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    margin: 0;
    width: 100%;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    letter-spacing: 0.14px;
    text-transform: uppercase;
    color: #6f6f6f;
  }

  &--focused {
    color: var(--color--focus);
  }

  &--filled {
    color: var(--color--focus);
  }
}
</style>
