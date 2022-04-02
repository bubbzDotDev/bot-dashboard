<script setup>
import { ref } from "vue";

const channels = ref([
  {
    id: "12345",
    name: "#welcome",
  },
  {
    id: "123456",
    name: "#hello",
  },
]);

const currentChannel = ref("");

const message = ref(`Hi {member}!`);
</script>

<template>
  <div>
    <h3>Update Welcome Message</h3>
    <form>
      <label>
        Current Channel
        <select v-model="currentChannel">
          <option v-if="!currentChannel" selected disabled value="">
            Select
          </option>
          <option v-else disabled value="">Select</option>
          <option
            v-for="channel in channels"
            :key="channel.id"
            :value="channel.id"
          >
            {{ channel.name }}
          </option>
        </select>
      </label>
      <label>
        Current Message:
        <textarea v-model="message"></textarea>
      </label>
      <button @click="updateMessage" type="button">UPDATE</button>
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
  margin: 0.5rem;
}

select {
  background-color: $primary-light;
  padding: 0.5rem;
  border: 3px solid $primary;
}

textarea {
  width: 300px;
  height: 100px;
  background-color: $primary-light;
  padding: 0.5rem;
  border: 3px solid $primary;
  font-size: 1rem;
  margin: 0.25rem;
}

button {
  @include button;
  width: 100px;
  margin-bottom: 1rem;
}
</style>
