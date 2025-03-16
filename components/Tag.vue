<script setup>
import { computed } from "vue";

const props = defineProps({
  className: String,
  isPrimary: Boolean,
});

const classes = computed(() => ({
  tag: true,
  "tag--primary": props.isPrimary,
}));
</script>

<template>
  <div :class="[className, classes]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  border: 1px solid var(--color-gray-25);
  border-radius: var(--border-radius-sm);
  padding: var(--spacer-xs) var(--spacer-sm);
}
</style>
