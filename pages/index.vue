<template>
  <div>
    <h1>Home</h1>
    <div>
        Simple blog app, to practice nuxt and ssr, deployment to vercel and
        firebase. <br />
        <br></br>
        Use Playwright simple tests just for fun. Use husky to run tests
        automatically before push.
        <br />
        Use simple email and password authentication with firebase. Will add
        more features later.
      </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blog",
});
</script>
