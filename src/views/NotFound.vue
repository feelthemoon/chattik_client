<template>
  <main class="not-found main">
    <div class="not-found__inner">
      <div class="text">
        <h1 class="not-found__title mb-0">{{ $t("pages.404.title") }}</h1>
        <h2 class="not-found__subtitle ml-1">{{ $t("pages.404.subtitle") }}</h2>
      </div>
      <div class="back mt-8">
        <router-link to="/im">{{ $t("pages.404.link_text") }}</router-link>
      </div>
    </div>
  </main>
</template>
