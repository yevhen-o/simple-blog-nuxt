<template>
  <div :class="invalidTextClasses">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  hasSpace: {
    type: Boolean,
    default: false,
  },
});

const invalidTextClasses = computed(() => [
  "invalid-text",
  {
    "invalid-text--has-space": props.hasSpace,
  },
]);
</script>

<style lang="scss" scoped>
.invalid-text {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-red);
  padding-bottom: var(--spacer-sm);

  &--has-space {
    padding: var(--spacer-xs) var(--spacer-sm);
  }
}
</style>
