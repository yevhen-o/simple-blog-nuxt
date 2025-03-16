<template>
  <div className="blog-article__wrapper">
    <BackButtonHeading>{{ title }}</BackButtonHeading>
    <article>{{ content }}</article>
    <div className="blog-article__author">
      <small>Author: </small>
      {{ author }}
    </div>
    <TagList :tags="tags" />
    <div className="blog-article__details">
      <h5>Details</h5>
      <div>Count of commas: {{ computedCountCommas }}</div>
      <div>Count of dots: {{ computedCountDots }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, defineProps } from "vue";
import { type PostInterface } from "~/types/PostInterface";
import BackButtonHeading from "~/components/BackButtonHeading";
import {
  countCommas as countCommasFn,
  countDots as countDotsFn,
} from "~/utils";
import TagList from "~/components/TagList";

const props = defineProps<{
  article: PostInterface;
}>();

const { title, content, author, tags, countCommas, countDots } = toRefs(
  props.article
);

const computedCountCommas = computed(() =>
  typeof props.article.countCommas !== "undefined"
    ? props.article.countCommas
    : countCommasFn(props.article.content)
);

const computedCountDots = computed(() =>
  typeof props.article.countDots !== "undefined"
    ? props.article.countDots
    : countDotsFn(props.article.content)
);
</script>

<style lang="scss" scoped>
.blog-article {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-df);
  }

  &__author {
    color: var(--color-gray-75);
  }
}
</style>
