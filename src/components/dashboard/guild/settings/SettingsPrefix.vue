<script setup>
import { ref } from "vue";

const prefix = ref("a!");

const updatedPrefix = ref("a!");

const updatePrefix = () => {
  updatedPrefix.value = prefix.value;
};
</script>

<template>
  <div>
    <h2>Update Command Prefix</h2>
    <form>
      <label>
        Current Prefix: {{ updatedPrefix }}
        <input v-model="prefix" type="text" />
      </label>
      <button @click="updatePrefix" type="button">UPDATE</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 50px;
  background-color: $primary-light;
  padding: 0.5rem;
  border: 3px solid $primary;
  font-size: 2rem;
  font-weight: bold;
  margin: 0.25rem;
}

button {
  @include button;
  width: 100px;
  margin-bottom: 1rem;
}
</style>
