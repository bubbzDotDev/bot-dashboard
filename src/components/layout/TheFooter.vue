<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer>
    <ul>
      <li>
        <RouterLink to="#home">
          <img
            src="@/assets/images/arrow-up-32px.png"
            alt="Up arrow"
            width="32"
            height="32"
            loading="lazy"
          />
          Top
        </RouterLink>
      </li>
      <li>
        <a
          rel="noopener"
          href="https://github.com/bubbzDotDev/bot-dashboard"
          target="_blank"
        >
          <img
            src="@/assets/images/github-32px.png"
            alt="GitHub logo"
            width="32"
            height="32"
            loading="lazy"
          />
          GitHub
        </a>
      </li>
      <li>
        <RouterLink to="/attribution">
          <img
            src="@/assets/images/heart-32px.png"
            alt="Heart"
            width="32"
            height="32"
            loading="lazy"
          />
          Credits
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/">
          <img
            src="@/assets/images/home-32px.png"
            alt="House"
            width="32"
            height="32"
            loading="lazy"
          />
          Home
        </RouterLink>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

footer {
  background-color: $primary;
  padding: 1rem;
  color: $primary-light;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a,
  router-link {
    display: flex;
    align-items: center;
    justify-content: start;
    color: $primary-light;
  }

  img {
    margin: 0.5rem;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;

  @include breakpoint("small") {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    width: 100%;
    max-width: 700px;
  }
}
</style>
