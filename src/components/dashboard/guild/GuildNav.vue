<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { RouterLink, useRoute } from "vue-router";
import MenuButton from "@/components/dashboard/guild/MenuButton.vue";

const userStore = useUserStore();

const guildId = ref(null);
const route = useRoute();
guildId.value = route.params.id;

const menuIsOpen = ref(false);

const toggleMenu = (isOpen = null) => {
  isOpen === null
    ? (menuIsOpen.value = !menuIsOpen.value) // Toggle coming from child emit
    : (menuIsOpen.value = isOpen); // False coming from this component's template

  userStore.updateMenu(menuIsOpen.value);
  /* Added to state so App.vue watches and adds
   * .no-scroll class to parent div (.app-grid)
   * of all components when menu is open so
   * overlay doesn't break during page scroll.
   */
};
</script>

<template>
  <div class="nav">
    <nav :class="{ 'menu-open': menuIsOpen }">
      <ul>
        <li>
          <RouterLink to="/dashboard" @click="toggleMenu(false)"
            >Server List</RouterLink
          >
        </li>
        <li>
          <RouterLink :to="`/dashboard/${guildId}`" @click="toggleMenu(false)"
            >Server Home</RouterLink
          >
        </li>
        <li>
          <RouterLink
            :to="`/dashboard/${guildId}/announce`"
            @click="toggleMenu(false)"
            >Announce</RouterLink
          >
        </li>
<!--        <li>-->
<!--          <RouterLink-->
<!--            :to="`/dashboard/${guildId}/settings`"-->
<!--            @click="toggleMenu(false)"-->
<!--            >Settings</RouterLink-->
<!--          >-->
<!--        </li>-->
      </ul>
      <MenuButton :menuOpen="menuIsOpen" @toggle-menu="toggleMenu" />
    </nav>
    <div @click="toggleMenu(false)" class="overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

nav {
  background-color: $accent;
  margin-top: -128px; // Each list item is 32px: 32 x 4 = 128
  transition: 0.25s;

  @include breakpoint("small") {
    margin-top: 0;
  }
}

.menu-open {
  margin: 0;
}

.menu-open ~ .overlay {
  background-color: black;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 2;
  margin-top: 295px;
  transition: 0.25s;

  @include breakpoint("small") {
    display: none;
  }
}

.menu-open::after {
  content: "";
  background-color: black;
  height: 135px; // Height of header
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: 2;
  transition: 0.25s;

  @include breakpoint("small") {
    display: none;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;

  @include breakpoint("small") {
    flex-direction: row;
    max-width: 700px;
    margin: 0 auto;
  }
}

li {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

a.router-link-exact-active,
a:hover {
  color: $primary-light;
  background-color: $link-dark;
}

a {
  text-decoration: none;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  transition: 0.25s;

  @include breakpoint("medium") {
    width: fit-content;
  }
}
</style>
