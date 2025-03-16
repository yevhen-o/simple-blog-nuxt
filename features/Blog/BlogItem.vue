<template>
  <div class="blog-item__wrapper">
    <Link
      :to="
        getUrl(IDENTIFIERS.BLOG_VIEW, {
          slug: item.slug,
        })
      "
    >
      <h2>{{ item.title }}</h2>
      <small>Author: {{ item.author }}</small>
    </Link>
  </div>
</template>

<script setup lang="ts">
import { getUrl, IDENTIFIERS, Link } from "~/utils";
const props = defineProps<{
  item: FirebasePostInterface;
}>();
</script>

<style>
.blog-item__wrapper {
  & > a {
    display: block;
    text-decoration: none;
    border: 1px solid var(--color-gray-25);
    border-radius: var(--border-radius-sm);
    padding: var(--spacer-df);
    color: var(--color-primary);
  }

  h2 {
    margin: 0;
  }

  small {
    color: var(--color-gray-75);
  }
}
</style>
