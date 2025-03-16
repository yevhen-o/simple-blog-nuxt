<template>
  <div :class="classes">
    <Link title="Go back" @click="router.back()" class="bb-heading__back">
      <ArrowLeft />
    </Link>
    <component :is="tag">
      <slot />
    </component>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "~/components/Icons";
import { Link } from "~/utils";

const props = defineProps({
  tag: { type: String, default: "h1" }, // Dynamic heading tag
  className: String,
});

const router = useRouter();

const classes = computed(() => ["bb-heading__wrapper", props.className]);
</script>

<style lang="scss" scoped>
.bb-heading__wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacer-df);

  & > a {
    color: var(--color-gray-75);

    :hover {
      transition: all 0.3s;
      transform: translate(-4px, 0);
    }
  }
}
</style>
