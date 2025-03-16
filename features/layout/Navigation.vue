<template>
  <div class="top-navigation__wrapper">
    <nav>
      <NuxtLink :to="getUrl(IDENTIFIERS.HOME)" class="logo">
        <img src="/favicon.ico" alt="My Blog Logo" class="logo__img" />
      </NuxtLink>
      <NuxtLink
        v-for="item in items"
        :key="item.link"
        :to="item.link"
        :class="[item.className, { active: isLinkActive(item.link) }]"
      >
        {{ item.title }}
      </NuxtLink>
      <UserMenu />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getUrl, IDENTIFIERS } from "~/utils";
import UserMenu from "~/features/authentication/UserMenu.vue";

const route = useRoute();

const items = [
  { link: getUrl(IDENTIFIERS.HOME), title: "Home" },
  { link: getUrl(IDENTIFIERS.BLOG), title: "Blog" },
  { link: getUrl(IDENTIFIERS.USERS), title: "Users" },
  {
    link: getUrl(IDENTIFIERS.BLOG_ADD),
    title: "Add new post",
    className: "primary",
  },
];

const isLinkActive = (link: string) => {
  return route.path === link;
};
</script>

<style lang="scss" scoped>
.top-navigation__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-sm);
  background-color: var(--color-gray-25);
  margin-bottom: var(--spacer-default);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  & > nav {
    display: flex;
    gap: var(--spacer-sm);
    max-width: 1200px;
    flex-grow: 2;
    justify-content: space-between;
  }

  & > nav a {
    padding: var(--spacer-sm) var(--spacer-gn);
    text-decoration: none;
    display: flex;
    align-items: center;

    &.active {
      background-color: var(--color-gray-50);
    }

    &.primary:not(.active) {
      background-color: var(--color-primary);
      color: var(--color-gray-0);
    }
  }

  a.logo {
    padding: 0;
  }
}
</style>
