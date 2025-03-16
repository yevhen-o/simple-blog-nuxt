<template>
  <button
    :id="id"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
    :aria-label="ariaLabel"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  id: String,
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  onClick: Function,
  disabled: Boolean,
  isPrimary: Boolean,
  isFlat: Boolean,
  className: String,
  ariaLabel: String,
});

const buttonClasses = computed(() => [
  "button",
  props.isPrimary ? "button--primary" : "",
  props.isFlat ? "button--flat" : "",
  props.className,
]);

const handleClick = (e: MouseEvent) => {
  if (props.onClick) {
    props.onClick(e);
  }
};
</script>

<style scoped lang="scss">
.button {
  border: none;
  outline: none;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;

  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: var(--border-radius-lg);
  font-weight: 700;
  color: var(--color-gray-0);
  background: linear-gradient(110.46deg, #9ba1a6 12.27%, #68696b 93.92%);

  &:hover {
    background: linear-gradient(110.46deg, #6f7172 12.27%, #454546 93.92%);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &--primary {
    background: linear-gradient(110.46deg, #70c3ff 12.27%, #4b65ff 93.92%);

    &:hover {
      background: linear-gradient(110.46deg, #64baf7 12.27%, #3d58f4 93.92%);
    }
  }

  &--flat {
    background: transparent;
    color: var(--color-gray-100);
    font-weight: normal;

    &:hover {
      background: linear-gradient(110.46deg, #d9e2e8 12.27%, #c2c3c8 93.92%);
    }
  }
}
</style>
