<script setup>
import { computed } from "vue";

const props = defineProps({
  menuOpen: {
    type: Boolean,
    default: false,
  },
});

// const menuIsOpen = ref(false);
//
// watch(
//   () => props.menuOpen,
//   (value) => {
//     value ? (menuIsOpen.value = true) : (menuIsOpen.value = false);
//   },
// );

const menuIsOpen = computed(() => props.menuOpen);

const emit = defineEmits(["toggle-menu"]);

const emitToggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value;
  emit("toggle-menu");
};
</script>

<template>
  <div
    :class="{ 'menu-open': menuIsOpen }"
    class="menu-button"
    @click="emitToggleMenu"
    aria-label="Menu button"
  >
    <span class="line top"></span>
    <span class="line middle"></span>
    <span class="line bottom"></span>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

.menu-button {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.25s;

  &:hover {
    cursor: pointer;
    background-color: $link-dark;

    .line {
      background-color: $primary-light;
    }
  }

  @include breakpoint("small") {
    display: none;
  }
}

.line {
  display: block;
  background-color: $link-dark;
  width: 25px;
  height: 3px;
  transition: 0.25s;
  margin: 2px;
}

.menu-open {
  .top {
    transform: rotate(-45deg) translate(-5px, 5px);
  }

  .middle {
    opacity: 0;
  }

  .bottom {
    transform: rotate(45deg) translate(-5px, -5px);
  }
}
</style>
