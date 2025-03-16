<template>
  <BlogArticle :article="article" />
</template>

<script setup lang="ts">
import BlogArticle from "~/features/Blog/BlogArticle.vue";
import { getBlogBySlug } from "~/services/httpClient";
const route = useRoute();
const { data: post } = await useAsyncData("post", () =>
  getBlogBySlug(route.params.slug)
);
const article = post?.value ? Object.values(post.value)[0] : null;
definePageMeta({
  layout: "blog",
});
</script>
