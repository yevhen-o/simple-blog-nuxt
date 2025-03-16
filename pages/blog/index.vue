<template>
  <div>
    <h1>List of articles</h1>
    <ListWrapper>
      <BlogItem v-for="post in posts" :item="post" :key="post.slug"> </BlogItem>
    </ListWrapper>
  </div>
</template>

<script setup lang="ts">
import ListWrapper from "~/components/ListWrapper.vue";
import BlogItem from "~/features/Blog/BlogItem.vue";
import { getBlogPosts } from "~/services/httpClient";

definePageMeta({
  layout: "blog",
});
const { data: posts } = await useAsyncData("posts", getBlogPosts);
</script>
